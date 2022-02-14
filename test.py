import random
state_ref = [
    """
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg content-questions-inner-item-left-state-icon passed" viewBox="0 0 16 16" aria-label="1">
        <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
    </svg>
    """,
    """
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-activity content-questions-inner-item-left-state-icon failed" viewBox="0 0 16 16" aria-label="0">
        <path fill-rule="evenodd" d="M6 2a.5.5 0 0 1 .47.33L10 12.036l1.53-4.208A.5.5 0 0 1 12 7.5h3.5a.5.5 0 0 1 0 1h-3.15l-1.88 5.17a.5.5 0 0 1-.94 0L6 3.964 4.47 8.171A.5.5 0 0 1 4 8.5H.5a.5.5 0 0 1 0-1h3.15l1.88-5.17A.5.5 0 0 1 6 2Z"/>
    </svg>
    """,
    """
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash-lg content-questions-inner-item-left-state-icon" viewBox="0 0 16 16" aria-label="-1">
        <path fill-rule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8Z"/>
    </svg>
    """
]

diffs = ["Hard", "Medium", "Easy"]

r = ""

for i in range(100):
    state = random.choice(state_ref)
    diff = random.choice(diffs)

    string = f"""
<div class="df aic content-questions-inner-item">
    <div class="df aic content-questions-inner-item-left">
        <div class="df aic jcc content-questions-inner-item-left-state">
            {state}
        </div>
        <div class="df aic content-questions-inner-item-left-id">
            <span class="content-questions-inner-item-left-id-text">
                a{i:0>3}
            </span>
        </div>
        <a class="df aic content-questions-inner-item-left-title" href="/views/problems/a{i:0>3}">
            <span class="content-questions-inner-item-left-title-text">
                just testing
            </span>
        </a>
    </div>
    <div class="df aic content-questions-inner-item-right">
        <div class="df aic content-questions-inner-item-right-acceptance">
            <span class="content-questions-inner-item-right-acceptance-text">
                {random.randint(1, 100)}%
            </span>
        </div>
        <div class="df aic content-questions-inner-item-right-difficulty">
            <span class="content-questions-inner-item-right-difficulty-text {diff.lower()}" aria-label="{diff.lower()}">
                {diff}
            </span>
        </div>
        <div class="df aic content-questions-inner-item-right-join">
            <span class="content-questions-inner-item-right-join-text">
                2022/{random.randint(1, 12):0>2}/{random.randint(1, 30):0>2}
            </span>
        </div>
    </div>
</div>
"""
    r += string

with open("a.txt", "w") as f:
    f.write(r)