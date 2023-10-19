#![no_std]

multiversx_sc::imports!();

#[multiversx_sc::contract]
pub trait Contract {
    #[init]
    fn init(&self) {}

    #[storage_mapper("creatorCodeDescriptions")]
    fn creator_code_descriptions(&self) -> MapMapper<ManagedAddress, ManagedBuffer>;
}
