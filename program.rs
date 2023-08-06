use anchor_lang::prelude::*;

declare_id!("Bm2D4UAycWRgtpnuDaMoXWSkrzX64NUzGqQJ5jYzCv2b");

#[program]
mod hello_world {
    use super::*;
    pub fn say_hello(_ctx: Context<SayHello>, data: u64) -> Result<()> {
        let x: String = data.to_string();
        msg!(&x);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct SayHello {}
