export function normalizePointDefinitions(obj){
    for (var key in obj){
        if (! obj.hasOwnProperty(key)){
            continue;
        }

        normalizeOnePointDefinition(obj[key]);
    }

    return obj;
};

export function normalizeOnePointDefinition(position){
    var isArray = Array.isArray(position),
        xCoordinate = isArray ? 0 : 'x',
        yCoordinate = isArray ? 1 : 'y';

    position[xCoordinate] = position[xCoordinate] * 16 + 8;
    position[yCoordinate] = position[yCoordinate] * 16;

    return position;
};
