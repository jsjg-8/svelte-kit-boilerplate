if ! asdf plugin-list | grep -q "bun"; then
  asdf plugin add bun
fi

# Install the latest version of bun and set it globally
asdf install bun latest
asdf global bun latest

# Install dependencies using bun
bun i