import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = (props) => (
  <ContentLoader 
    className='pizza-block'
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 430"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="319" y="168" rx="5" ry="5" width="100" height="15" /> 
    <rect x="402" y="186" rx="5" ry="5" width="80" height="25" /> 
    <circle cx="136" cy="110" r="112" /> 
    <rect x="0" y="232" rx="5" ry="5" width="280" height="26" /> 
    <rect x="0" y="279" rx="10" ry="10" width="280" height="87" /> 
    <rect x="0" y="392" rx="5" ry="5" width="100" height="26" /> 
    <rect x="140" y="383" rx="20" ry="20" width="140" height="42" />
  </ContentLoader>
)

export default Skeleton;