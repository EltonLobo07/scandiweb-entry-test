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
