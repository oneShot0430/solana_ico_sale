export type BuzeiraSale = {
  version: "0.1.0",
  name: "buzeira_sale",
  instructions: [
    {
      name: "init",
      accounts: [
        {
          name: "mint",
          isMut: false,
          isSigner: false
        },
        {
          name: "protocolStatus",
          isMut: true,
          isSigner: false
        },
        {
          name: "vault",
          isMut: true,
          isSigner: false
        },
        {
          name: "vaultAta",
          isMut: true,
          isSigner: false
        },
        {
          name: "signer",
          isMut: true,
          isSigner: true
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false
        },
        {
          name: "rent",
          isMut: false,
          isSigner: false
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false
        }
      ],
      args: [
        {
          name: "admin",
          type: "publicKey"
        },
        {
          name: "tokenMint",
          type: "publicKey"
        },
        {
          name: "saleDuration",
          type: "u64"
        },
        {
          name: "tokenPrice", type: "u64"
        }
      ]
    },
    {
      name: "buyToken",
      accounts: [
        {
          name: "protocolStatus",
          isMut: true,
          isSigner: false
        },
        {
          name: "vault",
          isMut: true,
          isSigner: false
        },
        {
          name: "mint",
          isMut: false,
          isSigner: false
        },
        {
          name: "fromAta",
          isMut: true,
          isSigner: false
        },
        {
          name: "toAta",
          isMut: true,
          isSigner: false
        },
        {
          name: "signer",
          isMut: true,
          isSigner: true
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false
        }
      ],
      args: [
        {
          name: "solAmount",
          type: "u64"
        }
      ]
    },
    {
      name: "withdrawToken",
      accounts: [
        {
          name: "protocolStatus",
          isMut: true,
          isSigner: false
        },
        {
          name: "vault",
          isMut: true,
          isSigner: false
        },
        {
          name: "mint",
          isMut: false,
          isSigner: false
        },
        {
          name: "fromAta",
          isMut: true,
          isSigner: false
        },
        {
          name: "toAta",
          isMut: true,
          isSigner: false
        },
        {
          name: "signer",
          isMut: true,
          isSigner: true
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false
        }
      ],
      args: [
        {
          name: "solAmount",
          type: "u64"
        },
        {
          name: "tokenAmount",
          type: "u64"
        }
      ]
    }
  ],
  accounts: [
    {
      name: "protocolStatus",
      type: {
        kind: "struct",
        fields: [
          {
            name: "admin",
            type: "publicKey"
          },
          {
            name: "tokenMint",
            type: "publicKey"
          },
          {
            name: "endTime",
            type: "u64"
          },
          {
            name: "tokenPrice",
            type: "u64"
          },
          {
            name: "totalParticipants",
            type: "u64"
          },
          {
            name: "totalSaleAmount",
            type: "u64"
          }
        ]
      }
    }
  ],
  errors: [
    {
      code: 6000,
      name: "InvalidSale",
      msg: "invalid sale"
    },
    {
      code: 6001,
      name: "InvalidWithdraw",
      msg: "Sale isn't ended"
    },
    {
      code: 6002,
      name: "InvalidCaller",
      msg: "invalid caller"
    }
  ]
};

export const IDL: BuzeiraSale = {
  version: "0.1.0",
  name: "buzeira_sale",
  instructions: [
    {
      name: "init",
      accounts: [
        {
          name: "mint",
          isMut: false,
          isSigner: false
        },
        {
          name: "protocolStatus",
          isMut: true,
          isSigner: false
        },
        {
          name: "vault",
          isMut: true,
          isSigner: false
        },
        {
          name: "vaultAta",
          isMut: true,
          isSigner: false
        },
        {
          name: "signer",
          isMut: true,
          isSigner: true
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false
        },
        {
          name: "rent",
          isMut: false,
          isSigner: false
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false
        }
      ],
      args: [
        {
          name: "admin",
          type: "publicKey"
        },
        {
          name: "tokenMint",
          type: "publicKey"
        },
        {
          name: "saleDuration",
          type: "u64"
        },
        {
          name: "tokenPrice", type: "u64"
        }
      ]
    },
    {
      name: "buyToken",
      accounts: [
        {
          name: "protocolStatus",
          isMut: true,
          isSigner: false
        },
        {
          name: "vault",
          isMut: true,
          isSigner: false
        },
        {
          name: "mint",
          isMut: false,
          isSigner: false
        },
        {
          name: "fromAta",
          isMut: true,
          isSigner: false
        },
        {
          name: "toAta",
          isMut: true,
          isSigner: false
        },
        {
          name: "signer",
          isMut: true,
          isSigner: true
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false
        }
      ],
      args: [
        {
          name: "solAmount",
          type: "u64"
        }
      ]
    },
    {
      name: "withdrawToken",
      accounts: [
        {
          name: "protocolStatus",
          isMut: true,
          isSigner: false
        },
        {
          name: "vault",
          isMut: true,
          isSigner: false
        },
        {
          name: "mint",
          isMut: false,
          isSigner: false
        },
        {
          name: "fromAta",
          isMut: true,
          isSigner: false
        },
        {
          name: "toAta",
          isMut: true,
          isSigner: false
        },
        {
          name: "signer",
          isMut: true,
          isSigner: true
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false
        }
      ],
      args: [
        {
          name: "solAmount",
          type: "u64"
        },
        {
          name: "tokenAmount",
          type: "u64"
        }
      ]
    }
  ],
  accounts: [
    {
      name: "protocolStatus",
      type: {
        kind: "struct",
        fields: [
          {
            name: "admin",
            type: "publicKey"
          },
          {
            name: "tokenMint",
            type: "publicKey"
          },
          {
            name: "endTime",
            type: "u64"
          },
          {
            name: "tokenPrice",
            type: "u64"
          },
          {
            name: "totalParticipants",
            type: "u64"
          },
          {
            name: "totalSaleAmount",
            type: "u64"
          }
        ]
      }
    }
  ],
  errors: [
    {
      code: 6000,
      name: "InvalidSale",
      msg: "invalid sale"
    },
    {
      code: 6001,
      name: "InvalidWithdraw",
      msg: "Sale isn't ended"
    },
    {
      code: 6002,
      name: "InvalidCaller",
      msg: "invalid caller"
    }
  ]
};