const common = {
  headers: {
    'user-agent': 'Reruter Fetcher',
    'content-type': 'application/json',
  },
};

export const GET = {
  ...common,
  method: 'GET',
};

export const POST = {
  ...common,
  method: 'POST',
};
