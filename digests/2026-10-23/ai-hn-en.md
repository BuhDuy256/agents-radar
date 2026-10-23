# Hacker News AI Community Digest 2026-10-23

> Source: [Hacker News](https://news.ycombinator.com/) | 8 stories | Generated: 2026-10-23 06:10 UTC

---

### Anthropic says LLMs can now formally verify real-world software at scale

Anthropic, working with Theorem, says Claude produced formal proofs of security properties at the RISC-V assembly level for 123 open-source libraries — showing that executables always exit normally without memory-safety errors or failed assertions, for every input under 64 MB and every modeled Linux OS response and memory layout. The approach converts existing fuzz-test suites into specifications rather than writing proofs from scratch; Claude also found long-standing bugs that had survived trillions of test runs. A subset of the proofs, plus the RISC-V and OS semantics, has been published so others can verify and reuse them, and Theorem is offering the pipeline to other open-source projects.

Source: [anthropic.com](https://www.anthropic.com/research/formal-verification) · [HN](https://news.ycombinator.com/item?id=50202217)
250 points · 136 comments

### NVIDIA releases OpenShell, a sandboxed runtime for fleets of autonomous AI agents

OpenShell gives agents file, package, API and credential access under declared policies, enforcing them at the kernel level on every file access, system call and network connection, and adding real credentials only to requests bound for approved endpoints. Before a policy change is applied, it uses formal verification to flag risky new access — such as reaching a new host with credentials — so those changes wait for human review. It runs on Linux, macOS on Apple Silicon, or Windows with WSL 2 (experimental), with SDKs for Python, TypeScript, Go and Rust, and a Helm-deployable gateway for Kubernetes. The 0.1.x release line brings a stable release cadence and new isolation primitives.

Source: [github.com](https://github.com/NVIDIA/OpenShell) · [HN](https://news.ycombinator.com/item?id=50198675)
354 points · 186 comments

### OpenAI ships an official CLI for its REST API

The `openai` CLI wraps the OpenAI REST API for terminal and script use: generating and saving images, uploading and downloading files, submitting and waiting on batches, exporting results as JSON/JSONL/YAML, and querying admin usage endpoints. It installs via prebuilt binaries, Homebrew, or `go install`, and authenticates with `OPENAI_API_KEY` (or `OPENAI_ADMIN_KEY` for admin endpoints). OpenAI distinguishes it from Codex CLI: use `openai` to call a specific API or script API operations, and `codex` for a coding agent working on a project.

Source: [github.com](https://github.com/openai/openai-cli) · [HN](https://news.ycombinator.com/item?id=50191507)
234 points · 110 comments

### Biograph study finds coronary inflammation in 42.9% of asymptomatic, low-risk patients using AI CT analysis

Biograph completed its first U.S. study combining high-resolution coronary CT angiography with Caristo Diagnostics' CaRi-Heart and CaRi-Plaque technologies, and reported that 42.9% of asymptomatic, low-risk participants had elevated coronary inflammation, with 17.9% showing very high inflammation in at least one major heart artery. About 47% of participants with no detectable coronary plaque had elevated coronary perivascular inflammation, and routine bloodwork — ApoB, non-HDL-C, HbA1c, hs-CRP — and the AHA PREVENT-ASCVD calculator showed no correlation with its presence. The company says this points to a possible upstream phase of disease and a window for proactive intervention, while noting more research is needed to establish prognostic value.

Source: [biograph.com](https://www.biograph.com/newsroom/biograph-completes-first-u.s.-study-with-caristo-diagnostics%E2%80%99-ai-powered-coronary-inflammation-detection-finding-risk-in-over-42-of-asymptomatic-patients) · [HN](https://news.ycombinator.com/item?id=50198940)
82 points · 41 comments

### Poll finds 57% of Americans say AI is bad for society, two-thirds oppose new data centers

An ABC News/Washington Post/Ipsos poll found a 57% majority saying AI is bad for society versus 42% saying it is good, while Americans split 50–49% on whether AI is good for them personally. On risks, 73% see a high risk of AI hacking secure computer systems, 65% of eliminating many jobs, 62% of people losing the ability to make decisions without AI, and 33% of human extinction; on benefits, only 34% see a big chance AI makes everyday tasks easier and 13% that it creates many new jobs. Two-thirds (66%) oppose new data centers in the U.S., rising to 72% for one in their own community, and two-thirds say the federal government is not doing enough to regulate AI.

Source: [abcnews.com](https://abcnews.com/Politics/americans-ai-bad-society-oppose-data-centers-abcpostipsos/story?id=137414085) · [HN](https://news.ycombinator.com/item?id=50200843)
75 points · 51 comments

### OpenAI models are coming to Google Cloud

Full article content could not be retrieved.

Source: [openai.com](https://openai.com/index/openai-models-google-cloud/) · [HN](https://news.ycombinator.com/item?id=50180079)
323 points · 145 comments

### Using thousands of AI agents to uncover new leads in biological data

Full article content could not be retrieved.

Source: [openai.com](https://openai.com/index/scaling-ai-research-for-complex-biological-data/) · [HN](https://news.ycombinator.com/item?id=50180752)
156 points · 105 comments

### AI compute is the new oil–and needs a new market

Full article content could not be retrieved.

Source: [economist.com](https://www.economist.com/finance-and-economics/2026/10/22/ai-compute-is-the-new-oil-and-needs-a-new-market) · [HN](https://news.ycombinator.com/item?id=50202671)
42 points · 45 comments

---
*This digest is auto-generated by [agents-radar](https://github.com/BuhDuy256/agents-radar).*