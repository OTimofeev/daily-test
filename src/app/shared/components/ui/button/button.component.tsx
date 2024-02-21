import React, {FC} from "react";

export type ButtonComponentProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    designType?: "primary" | "secondary" | 'danger';
    text?: string;
}

const ButtonComponent: FC<ButtonComponentProps> = ({text, designType, className, ...rest}: ButtonComponentProps) => {
    designType = designType ?? "primary";

    const classes = className?.split(" ") ?? [];
    classes.push("text-white");
    classes.push("rounded-md");
    classes.push("px-2");
    classes.push("py-1");
    classes.push("text-center");
    classes.push("content-center");

    switch (designType) {
        case "primary":
            classes.push("bg-blue-500");
            break;
        case "secondary":
            classes.push("bg-gray-500");
            break;
        case "danger":
            classes.push("bg-red-500");
            break;
    }

    return (
        <button className={classes.join(" ")} {...rest}>
            {text ?? rest.children}
        </button>
    )
};

export default ButtonComponent;
