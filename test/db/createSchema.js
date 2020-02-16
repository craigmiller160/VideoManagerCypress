const executeQuery = async (client, query) => {
    try {
        await client.query(query);
        console.log(`Successful query: ${query}`);
    } catch {
        console.log(`Error running query: ${query}`);
        return Promise.resolve();
    }
};

const createSchema = async (client, scripts) => {
    const {
        dropScript,
        createScript,
        rolesScript
    } = scripts;
    const dropPromises = dropScript.split('\n')
        .map(async (query) => await executeQuery(client, query));
    await Promise.all(dropPromises);

    const createPromises = createScript.split('\n')
        .map(async (query) => await executeQuery(client, query));
    await Promise.all(createPromises);

    await executeQuery(client, rolesScript);
};

module.exports = createSchema;