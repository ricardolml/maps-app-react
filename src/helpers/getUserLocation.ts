
export const getUserLocation = async (): Promise<[ number, number ]> => {
    return new Promise( ( resolve, reject ) => {
        navigator.geolocation.getCurrentPosition(
            ( { coords }  ) => {
                resolve( [ coords.longitude , coords.latitude ] );
            },

            ( err ) => {
                alert('No se puedo obtener la geolocalización');
                reject([ -71.2063181 , 46.8120929 ]);
            }
        );
    });
}