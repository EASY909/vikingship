import * as React from 'react';
import { render, fireEvent } from "@testing-library/react";
import Button, { IButtonProps, ButtonSize, ButtonType } from './button';
const defaultProps = {
    onClick: jest.fn()
}
const testProps: IButtonProps = {
    btnType: ButtonType.Primary,
    size: ButtonSize.large,
    className: 'klass'
}
const disabledProps: IButtonProps = {
    disabled: true,
    onClick: jest.fn()
}
describe('test button component', () => {
    it('should render the correct default button', () => {
        // eslint-disable-next-line testing-library/render-result-naming-convention
        const screen = render(<Button {...defaultProps}>Nice</Button>);
        const element = screen.getByText('Nice') as HTMLButtonElement;
        expect(element).toBeInTheDocument();
        expect(element.tagName).toEqual('BUTTON');
        expect(element).toHaveClass('btn btn-default');
        expect(element.disabled).toBeFalsy();
        fireEvent.click(element);
        expect(defaultProps.onClick).toHaveBeenCalled();
    })
    it('should render the correct component base on different props', () => {
        // eslint-disable-next-line testing-library/render-result-naming-convention
        const screen = render(<Button {...testProps}>Nice</Button>);
        const element = screen.getByText('Nice');
        expect(element).toBeInTheDocument();
        expect(element).toHaveClass('btn-primary btn-lg klass');
    })
    it('should render a link when btnType equals link and href is provided', () => {
        // eslint-disable-next-line testing-library/render-result-naming-convention
        const screen = render(<Button btnType={ButtonType.Link} href="http://xxx">Link</Button>);
        const element = screen.getByText('Link');
        expect(element).toBeInTheDocument();
        expect(element.tagName).toEqual('A');
        expect(element).toHaveClass('btn btn-link');
    })
    it('should render disabled button when disabled set to true', () => {
        // eslint-disable-next-line testing-library/render-result-naming-convention
        const screen = render(<Button {...disabledProps}>Nice</Button>);
        const element = screen.getByText('Nice') as HTMLButtonElement;
        expect(element).toBeInTheDocument();
        expect(element.disabled).toBeTruthy();
        fireEvent.click(element);
        expect(disabledProps.onClick).not.toHaveBeenCalled();
    })
})

