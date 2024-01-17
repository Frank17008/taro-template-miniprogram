import { IconFont as TaroIconFont } from '@nutui/icons-react-taro'
import { CSSProperties, useMemo } from 'react'

interface IProps {
  style?: CSSProperties
  type: string
  className?: string
  size?: string | number
}
const IconFont = (props: IProps | any) => {
  const { type, ...otherProps } = props
  const types = useMemo(() => type?.split('-'), [type])
  const classPrefix = types?.length > 0 ? types[0] : ''
  const name = types?.length > 1 ? types.slice(1).join('-') : ''
  return (
    <TaroIconFont
      fontClassName="iconfont"
      classPrefix={classPrefix}
      name={name}
      {...otherProps}
    />
  )
}
export default IconFont
