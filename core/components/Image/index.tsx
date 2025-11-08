import { forwardRef, useEffect, useMemo, useState, type ComponentProps } from 'react';
import { Image as TamaguiImage, type StackProps } from 'tamagui';

import { ImageOff } from '../icons';
import Skeleton from '../Skeleton';
import View from '../View';

import type { ImageSourcePropType } from 'react-native';

type BaseImageProps = Omit<ComponentProps<typeof TamaguiImage>, 'source'>;

export type ImageProps = BaseImageProps & {
  containerStyle?: StackProps['style'];
  imageStyle?: BaseImageProps['style'];
};

export const Image = forwardRef<any, ImageProps>(function InnerImage(
  {
    containerStyle,
    imageStyle,
    onLoad,
    onError,
    src,
    ...rest
  },
  ref,
) {
  const [isLoading, setIsLoading] = useState(() => Boolean(src));
  const [hasError, setHasError] = useState(false);

  const resolvedSource = useMemo<ImageSourcePropType | undefined>(() => (
    src ? { width: '100%', height: '100%', uri: src } as unknown as ImageSourcePropType : undefined
  ), [src]);

  const opacityStyle = useMemo(() => ({ opacity: hasError ? 0 : 1 } as const), [hasError]);

  useEffect(() => {
    setIsLoading(Boolean(src));
    setHasError(false);
  }, [src]);

  const handleLoad = (event: Parameters<NonNullable<BaseImageProps['onLoad']>>[0]) => {
    setIsLoading(false);
    setHasError(false);
    onLoad?.(event);
  };

  const handleError = (event: Parameters<NonNullable<BaseImageProps['onError']>>[0]) => {
    setIsLoading(false);
    setHasError(true);
    onError?.(event);
  };

  const containerStyles = useMemo(() => (
    [{ position: 'relative', overflow: 'hidden', width: '100%', height: '100%' }, containerStyle].filter(Boolean)
  ), [containerStyle]);

  const imageStyles = useMemo(() => (
    [imageStyle, opacityStyle].filter(Boolean)
  ), [imageStyle, opacityStyle]);

  return (
    <View ref={ref} borderWidth={0} style={containerStyles as StackProps['style']}>
      <TamaguiImage
        source={resolvedSource}
        {...rest}
        style={imageStyles as BaseImageProps['style']}
        onLoad={handleLoad}
        onError={handleError}
      />

      {isLoading ? (
        <Skeleton
          width='100%'
          height='100%'
          position='absolute'
          top={0}
          left={0}
          right={0}
          bottom={0}
        />
      ) : null}

      {hasError ? (
        <View
          position='absolute'
          top={0}
          bottom={0}
          left={0}
          right={0}
          alignItems='center'
          justifyContent='center'
        >
          <ImageOff size={24} color='$color11' />
        </View>
      ) : null}
    </View>
  );
});

export default Image;

