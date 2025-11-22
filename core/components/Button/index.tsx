import React, { ComponentType, forwardRef } from 'react';
import {
  Spinner,
  styled,
  Button as TamaguiButton,
  type SizeTokens,
  type ButtonProps as TamaguiButtonProps
} from 'tamagui';



type ButtonType = 'primary' | 'default' | 'text' | 'link' | 'dashed';
type ButtonSize = 'small' | 'middle' | 'large';

const SIZE_MAP: Record<ButtonSize, SizeTokens> = {
  small: '$3',
  middle: '$4',
  large: '$5',
};

const StyledButton = styled(TamaguiButton, {
  borderRadius: 1000,
  borderWidth: 1,
  borderColor: 'transparent',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  animation: 'bouncy',
  pressStyle: { scale: 0.96, opacity: 0.9 },
  disabledStyle: { opacity: 0.6, pointerEvents: 'none' },

  variants: {
    type: {
      primary: {
        backgroundColor: '$primary',
        color: 'white',
        borderWidth: 0,
        hoverStyle: { backgroundColor: '$primary', opacity: 0.9 },
      },
      default: {
        backgroundColor: '$background2',
        borderColor: '$borderColor',
        color: '$color',
        hoverStyle: { borderColor: '$primary', color: '$primary' },
      },
      dashed: {
        backgroundColor: '$background',
        borderColor: '$borderColor',
        color: '$color',
        borderStyle: 'dashed',
        hoverStyle: { borderColor: '$primary', color: '$primary' },
      },
      text: {
        backgroundColor: 'transparent',
        borderWidth: 0,
        color: '$color',
        hoverStyle: { backgroundColor: '$backgroundHover' },
      },
      link: {
        backgroundColor: 'transparent',
        borderWidth: 0,
        color: '$primary',
        hoverStyle: { opacity: 0.8 },
      },
    },

    buttonSize: {
      small: {
        height: 32,
        paddingHorizontal: '$3',
        fontSize: '$3',
        iconSize: 14,
      },
      middle: {
        height: 44,
        paddingHorizontal: '$4',
        fontSize: '$4',
        iconSize: 16,
      },
      large: {
        height: 52,
        paddingHorizontal: '$6',
        fontSize: '$5',
        iconSize: 20,
      },
    },

    danger: {
      true: {

      },
    },

    fullWidth: {
      true: {
        width: '100%',
        flex: 1,
      },
    },

    disabled: {
      true: {
        opacity: 0.5,
        pointerEvents: 'none',
      },
    }
  } as const,

  defaultVariants: {
    type: 'default',
    buttonSize: 'middle',
  },
});

export type ButtonProps = Omit<TamaguiButtonProps, 'size'> & {
  type?: ButtonType;
  size?: ButtonSize;
  danger?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  htmlType?: 'button' | 'submit' | 'reset';
};

const Button = forwardRef<ComponentType<typeof TamaguiButton>, ButtonProps>((props, ref) => {
  const {
    type = 'default',
    size = 'middle',
    danger,
    loading,
    disabled,
    children,
    icon,
    iconAfter,
    ...rest
  } = props;

  const dangerStyles = danger
    ? getDangerStyles(type)
    : {};

  const isLoading = loading;
  const isDisabled = disabled || isLoading;

  return (
    <StyledButton
      ref={ref}
      type={type}
      size={SIZE_MAP[size]}
      buttonSize={size}
      fullWidth={props.fullWidth}
      disabled={isDisabled}
      icon={isLoading ? <Spinner color={danger ? '$red10' : (type === 'primary' ? 'white' : '$primary')} /> : icon}
      iconAfter={iconAfter}
      {...dangerStyles as any}
      {...rest}
    >
      {children}
    </StyledButton>
  );
});

function getDangerStyles(type: ButtonType) {
  switch (type) {
    case 'primary':
      return {
        backgroundColor: '$red10',
        color: 'white',
        hoverStyle: { backgroundColor: '$red10', opacity: 0.8 },
      };
    case 'default':
    case 'dashed':
      return {
        borderColor: '$red10',
        color: '$red10',
        hoverStyle: { borderColor: '$red10', color: '$red10', opacity: 0.8 },
      };
    case 'text':
    case 'link':
      return {
        color: '$red10',
        hoverStyle: { color: '$red10', opacity: 0.8, backgroundColor: type === 'text' ? '$backgroundHover' : 'transparent' },
      };
    default:
      return {};
  }
}

export default Button;
