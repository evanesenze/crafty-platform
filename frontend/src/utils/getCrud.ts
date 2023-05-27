type Key = `${string}Key`;

type CrudResult = {
    [key: Key]: number;
};

export const getCrud = (name: string): CrudResult => {
    return {
        [name]: 1,
    };
};

const {} = getCrud('test');
