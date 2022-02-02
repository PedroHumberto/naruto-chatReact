import React from 'react';
import appConfig from '../config.json';
import { Box, Text, Image } from '@skynexui/components';

export default function Error404(props) {
  const user = String(props.Username);

  if (user === '' || user.length < 3) {
    return (
      <>
        <Box
          styleSheet={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            maxWidth: "200px",
            padding: "16px",
            flex: 1,
            minHeight: "240px",
          }}
        >
          <Image
            styleSheet={{
              borderRadius: "50%",
              marginBottom: "16px",
              height: "168px",
              width: "168px",
            }}
            src={`https://c.tenor.com/QRcXk_fi5TYAAAAC/naruto-ninja.gif`}
          />
          <Text
            variant="body4"
            styleSheet={{
              color: appConfig.theme.colors.neutrals[200],
              backgroundColor: appConfig.theme.colors.neutrals[900],
              padding: "3px 10px",
              borderRadius: "1000px",
            }}
          >
            username
          </Text>
        </Box>
      </>
    );
  } else {
    return (
      <>
        <Box
          styleSheet={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            maxWidth: "200px",
            padding: "16px",
            flex: 1,
            minHeight: "240px",
          }}
        >
          <Image
            styleSheet={{
              borderRadius: "50%",
              marginBottom: "16px",
            }}
            src={`https://github.com/${user}.png`}
          />
          <Text
            variant="body4"
            styleSheet={{
              color: appConfig.theme.colors.neutrals[200],
              backgroundColor: appConfig.theme.colors.neutrals[900],
              padding: "3px 10px",
              borderRadius: "1000px",
            }}
          >
            {user}
          </Text>
        </Box>
      </>
    );
  }
}