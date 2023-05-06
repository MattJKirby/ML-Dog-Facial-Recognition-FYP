import React, { FC, PropsWithChildren } from 'react';

import { Box, Meter } from 'grommet';

type ConfidenceMeterProps = {
  value: number;
}

const ConfidenceMeter: FC<PropsWithChildren<ConfidenceMeterProps>> = ({
  value
}) => {

  return (
    <Box align="center" pad="large">
      <Meter type="bar" value={value} direction="vertical"/>
    </Box>
  );
};

export default ConfidenceMeter;