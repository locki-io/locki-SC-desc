#![no_std]

multiversx_sc::imports!();

#[multiversx_sc::contract]
pub trait Contract {
    #[init]
    fn init(&self) {}

    #[storage_mapper("creatorCodeDescriptions")]
    fn creator_code_descriptions(&self) -> MapMapper<u8, ManagedBuffer>;

    #[endpoint(storeCreatorDescription)]
    fn store_creators_description(&self, nft_nonce: u8, description: ManagedBuffer) {
        self.creator_code_descriptions().insert(nft_nonce.clone(), description.clone());
    }

    #[view]
    fn you_mint_lucky_you(&self, nft_nonce: u8) -> Option<ManagedBuffer> {
        let description = self.creator_code_descriptions().get(&nft_nonce);
        description
    }
}
