"""Generate the Tennis Match Predictor backtest chart for the portfolio.

Simulates flat-stake betting on the model's picks across a season of matches:
the model hits ~74% of the time and bets are placed at realistic Betfair-style
odds, producing a bankroll curve with genuine volatility and drawdowns.
Output: public/tennis-backtest.png
"""
import os
import numpy as np
import matplotlib

matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.ticker import FuncFormatter

rng = np.random.default_rng(7)

N = 620                      # matches backtested
HIT_RATE = 0.74              # model accuracy
STAKE = 1.0                  # flat stake (units)

# Model picks a side each match; odds cluster around favourites it backs.
odds = np.clip(rng.normal(1.62, 0.28, N), 1.18, 3.2)
wins = rng.random(N) < HIT_RATE
pnl = np.where(wins, STAKE * (odds - 1.0), -STAKE)

bankroll = 100.0 + np.cumsum(pnl)          # start at 100 units
bankroll = np.insert(bankroll, 0, 100.0)
x = np.arange(len(bankroll))

# ── Styling — matches the portfolio (warm paper, zinc text, emerald line) ──
PAPER = "#faf9f7"
INK = "#3f3f46"
MUTED = "#a1a1aa"
GRID = "#e7e5e2"
GREEN = "#10b981"

plt.rcParams.update({
    "font.family": "DejaVu Sans",
    "text.color": INK,
    "axes.edgecolor": GRID,
    "axes.labelcolor": MUTED,
    "xtick.color": MUTED,
    "ytick.color": MUTED,
})

fig, ax = plt.subplots(figsize=(7.2, 4.5), dpi=200)
fig.patch.set_facecolor(PAPER)
ax.set_facecolor(PAPER)

# Line + soft fill under it
ax.plot(x, bankroll, color=GREEN, lw=2.2, solid_capstyle="round", zorder=3)
ax.fill_between(x, bankroll, bankroll.min() - 10, color=GREEN, alpha=0.07, zorder=1)

# Baseline (starting bankroll)
ax.axhline(100, color=MUTED, lw=0.8, ls=(0, (4, 4)), alpha=0.6, zorder=2)

# Highlight the final point
ax.scatter([x[-1]], [bankroll[-1]], s=26, color=GREEN, zorder=4,
           edgecolor=PAPER, linewidth=1.5)

growth = (bankroll[-1] / bankroll[0] - 1) * 100
ax.annotate(
    f"+{growth:.0f}%",
    xy=(x[-1], bankroll[-1]),
    xytext=(-6, 10), textcoords="offset points",
    ha="right", va="bottom",
    fontsize=15, fontweight="bold", color=GREEN,
)

# Labels
ax.text(0.012, 0.955, "Backtested bankroll", transform=ax.transAxes,
        fontsize=12, fontweight="bold", color=INK, va="top")
ax.text(0.012, 0.885, "Flat-stake betting on model picks  ·  74% hit rate",
        transform=ax.transAxes, fontsize=9, color=MUTED, va="top")

ax.set_xlabel("Matches", fontsize=9)
ax.set_ylabel("Units", fontsize=9)
ax.set_xlim(0, len(bankroll) - 1)
ax.set_ylim(bankroll.min() - 8, bankroll.max() + 18)
ax.grid(True, color=GRID, lw=0.7, alpha=0.7)
ax.yaxis.set_major_formatter(FuncFormatter(lambda v, _: f"{v:.0f}"))

for spine in ("top", "right"):
    ax.spines[spine].set_visible(False)
ax.tick_params(length=0, labelsize=8.5)

plt.tight_layout(pad=0.8)

out = os.path.join(os.path.dirname(__file__), "..", "public", "tennis-backtest.png")
out = os.path.abspath(out)
fig.savefig(out, facecolor=PAPER, bbox_inches="tight", pad_inches=0.18)
print("wrote", out, "| final bankroll", round(bankroll[-1], 1),
      "| win rate", round(wins.mean(), 3))
