from pathlib import Path

basedir = Path.cwd
with open("/etc/apt/sources.list", "r") as f:
    new_sources = list(
        map(
            lambda l: l.rstrip() + " contrib non-free\n" if "deb" in l else l,
            f.readlines(),
        )
    )
with open("/etc/apt/sources.list", "w") as f:
    f.writelines(new_sources)
