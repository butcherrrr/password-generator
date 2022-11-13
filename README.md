# password-generator

Generates passwords in the terminal using node (or bun). Done for my own convenience.

1. Symlink to `pass.js` file:

```bash
ln -s /path/to/file password_generator
```

2. Set an alias in `.bashrc` (or `.zshrc`):

```bash
alias np="node ~/password_generator"
```

3. Then pass the password length as a param (minimum 6 characters):

```bash
np 12 # leave blank for default value of 21
```

4. ???

5. Profit.
