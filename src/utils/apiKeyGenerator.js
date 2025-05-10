const apiKeyGeneretor = async (_req) => {
    const key = 'sk_' + Math.random().toString(36).substr(2 , 24);
    return key
}

module.exports = apiKeyGeneretor;
