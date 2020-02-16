const executeQuery = async (client, query) => {
    try {
        await client.query(query);
    } catch {
        console.log(`Error running query: ${query}`);
        return Promise.resolve();
    }
};

const createSchema = async (client, dropScript, createScript) => {
    const dropPromises = dropScript.split('\n')
        .map(async (query) => await executeQuery(client, query));
    await Promise.all(dropPromises);

    const createPromises = createScript.split('\n')
        .map(async (query) => await executeQuery(client, query));
    await Promise.all(createPromises);
};

module.exports = createSchema;