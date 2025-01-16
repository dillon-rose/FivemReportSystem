import { Button, ButtonTypes } from "./ui/button";
import {  } from '@/components/ui/button';

type props = {
    children: React.ReactNode,
    link: string,
    variant?: ButtonTypes,
    classname?: string,
}

const ExternalLink = ({ children, link, classname, variant = "link" }: props) => {
    const openLink = () => {
        //@ts-ignore
        window.invokeNative('openUrl', link);
    }

    return (
        <Button variant={variant} className="p-0" size="sm" onClick={openLink}>
            <a href={link} className={`${classname}`} target="_blank" rel="noopener noreferrer" onClick={openLink}>
                {children}
            </a>
        </Button>
    )
}

export default ExternalLink