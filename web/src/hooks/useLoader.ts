import { Block } from "notiflix";
import { useEffect, useState } from "react"

export const useLoader = (classname: string): [React.Dispatch<React.SetStateAction<boolean>>, boolean] => {
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isLoading) {
            Block.pulse(classname, "Loading...", {
                className: 'notiflix-block',
                backgroundColor: '#9f9f9f66',
                svgColor: '#ff8119',
                messageColor: 'white',
            });
        }
        else {
            Block.remove(classname);
        }
    }, [isLoading]);

    return [setIsLoading, isLoading];
}