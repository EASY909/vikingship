import classNames from "classnames";
export enum ButtonSize {
    large = 'lg',
    small = 'sm'
}

export enum ButtonType {
    Primary = 'primary',
    Default = 'default',
    Danger = 'danger',
    Link = 'link',
}

interface IBaseButtonProps {
    className?: string;
    disabled?: boolean;
    size?: ButtonSize;
    btnType?: ButtonType;
    children: React.ReactNode;
    href?: string;
}
type INativeButtonProps = IBaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>;
type AnchorButtonProps = IBaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>;
export type IButtonProps = Partial<INativeButtonProps & AnchorButtonProps>;

const Button: React.FC<IButtonProps> = (props) => {
    const { btnType, className, disabled, size, children, href, ...restprops } = props;

    const classes = classNames('btn', className, {
        [`btn-${btnType}`]: btnType,
        [`btn-${size}`]: size,
        'disabled': (btnType === ButtonType.Link) && disabled
    });

    if (btnType === ButtonType.Link && href) {
        return (
            <a className={classes} href={href} {...restprops}>
                {children}
            </a >
        )
    } else {
        return (
            <button className={classes} disabled={disabled}  {...restprops}>{children}</button>
        )
    }
}
Button.defaultProps = {
    disabled: false,
    btnType: ButtonType.Default
}
export default Button;