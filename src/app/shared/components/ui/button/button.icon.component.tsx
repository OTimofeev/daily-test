import {ButtonHTMLAttributes} from "react";
import classNames from "classnames";

export type ButtonIconComponentProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    designType?: "primary" | "secondary" | 'danger';
    icon: string;
    size?: "sm" | "md" | "lg";
    transparent?: boolean;
}

const sizeMap = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-12 w-12",
}

const sizeIconMap = {
    sm: "text-md",
    md: "text-md",
    lg: "text-lg",
}

const ButtonIconComponent = ({icon, designType, className, size, transparent,  ...rest}: ButtonIconComponentProps) => {
    designType = designType ?? "primary";
    size = size ?? "md";
    transparent = transparent ?? false;

    const classes = className?.split(" ") ?? [];
    classes.push("rounded-full");
    classes.push("text-center");
    classes.push("content-center");
    classes.push("flex flex-col justify-center items-center");
    classes.push(sizeMap[size]);

    switch (designType) {
        case "primary":
            classes.push(transparent ? "" : "bg-blue-500");
            classes.push(transparent ? "text-blue-500" : "text-white");
            // classes.push("bg-blue-500");
            break;
        case "secondary":
            classes.push(transparent ? "" : "bg-gray-500");
            classes.push(transparent ? "text-gray-500" : "text-white");
            break;
        case "danger":
            classes.push(transparent ? "" : "bg-red-500");
            classes.push(transparent ? "text-red-500" : "text-white");
            // classes.push("bg-red-500");
            break;
    }

    return (
        <button className={classNames(classes)} {...rest}>
            <i className={classNames('material-symbols-outlined', sizeIconMap[size])}>{icon}</i>
        </button>
    )
}

export default ButtonIconComponent;
