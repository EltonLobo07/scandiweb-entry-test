export const GET_CATEGORY_NAMES = `
    query {
        categories {
            name
        }
    }
`;

export const GET_CURRENCIES = `
    query {
        currencies {
            label,
            symbol
        }
    }
`;

export const GET_CATEGORY_NAMES_AND_CURRENCIES = `
    query {
        categories {
            name
        },
        currencies {
            label,
            symbol
        }
    }
`
export const GET_CUR_CATEGORY_NAME_PRODUCTS = `
    query($input: CategoryInput) {
        category(input: $input) {
            products {
                gallery,
                name,
                brand,
                id,
                inStock,
                prices {
                    currency {
                        symbol,
                        label
                    },
                    amount
                },
                attributes {
                    id,
                    name,
                    type, 
                    items {
                        displayValue,
                        value,
                        id
                    }
                }
            }
        }
    }
`;

export const GET_SINGLE_PRODUCT = `
    query($id: String!) {
        product(id: $id) {
            id,
            gallery,
            brand,
            name,
            prices {
                currency {
                    label,
                    symbol
                },
                amount
            },
            description,
            inStock,
            attributes {
                id,
                name,
                type, 
                items {
                    displayValue,
                    value,
                    id
                }
            }
        }
    }
`;
