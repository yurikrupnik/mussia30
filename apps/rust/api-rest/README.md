cargo build --timings --release


cargo llvm-lines | head -20

```rust
cargo install --locked cargo-deny
cargo deny init
cargo deny check
```

```rust
cargo install --locked cargo-outdated
cargo outdated
cargo update
```
```rust
cargo install cargo-udeps --locked
cargo +nightly udeps

```
