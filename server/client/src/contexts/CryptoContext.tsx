import React, {createContext, useState} from "react";
import axios from "axios";

import {
    defaultCryptoValue,
    ICrypto,
    ICryptoContext,
    ICurrency,
    ISimplePrice,
    TGetCryptosFC,
    TGetCurrenciesFC,
    TGetSimplePricesFC,
} from "../interfaces/ICryptoContext";
import {useAuth0} from "@auth0/auth0-react";

export const CryptoContext = createContext<ICryptoContext>(defaultCryptoValue);

export const CryptoProvider: React.FC = ({children}) => {
    const {getAccessTokenSilently, user} = useAuth0();
    // const { user } = useContext(AuthenticationContext);
    // const { Alerts } = useContext(AlertContext);
    const [cryptos, setCryptos] = useState<Array<ICrypto>>([]);
    const [currencies, setCurrencies] = useState<Array<ICurrency>>([]);
    const [simplePrices, setSimplePrices] = useState<Array<ISimplePrice>>([]);
    // const { user } = useContext(AuthenticationContext);

    // const setCryptos = (data: any, id: string) => {
    //   const notif: ICrypto = {
    //     id: id,
    //     pushToken: data.pushToken,
    //     email: data.email,
    //     crypto: data.crypto,
    //     operator: data.operator,
    //     value: data.value,
    //   };
    //   return notif;
    // };

    const getSimplePrices: TGetSimplePricesFC = async () => {
        const token = await getAccessTokenSilently();
        axios
            .get(process.env.REACT_APP_ENDPOINT_PROD + "/simplePrice", {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            })
            .then((res: any) => {
                console.log("simple prices = ", res.data);
                setSimplePrices(res.data);

                return res.data;
            })
            .catch((e) => console.log(e));
        return;
    };

    const getCryptos: TGetCryptosFC = async () => {
        console.log("get cryptos");
        const token = await getAccessTokenSilently();
        axios
            .get(process.env.REACT_APP_ENDPOINT_PROD + "/cryptos", {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            })
            .then((res: any) => {
                console.log(res.data);
                setCryptos(res.data);

                return res.data;
            })
            .catch((e) => console.log(e));
        return;
    };

    const getCurrencies: TGetCurrenciesFC = async () => {
        try {
            const token = await getAccessTokenSilently();
            const res: any = await axios.get(
                process.env.REACT_APP_ENDPOINT_PROD + "/currencies",
                {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(res.data);
            setCurrencies(res.data);
        } catch {
            return;
        }
    };

    // useEffect(() => {
    //   if (!cryptos) getCryptos();
    //   if (!currencies) getCurrencies();
    // });

    // const getCryptosById: TGetCryptosByIdFC = async (
    //   payload: string
    // ) => {};

    return (
        <CryptoContext.Provider
            value={{
                cryptos,
                currencies,
                simplePrices,

                getCryptos,
                getCurrencies,
                getSimplePrices,
            }}
        >
            {children}
        </CryptoContext.Provider>
    );
};
