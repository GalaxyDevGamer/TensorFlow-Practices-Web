// @generated: @expo/next-adapter@2.1.41
import { GridList, GridListTile, GridListTileBar, ListItem, Typography } from '@material-ui/core';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import Page, { menu } from './page';

export default function App() {
  const router = useRouter()
  const [contentWidth, setContentWidth] = useState(0)
  const [size, setSize] = useState(0)

  useEffect(() => {
    setContentWidth(window.innerWidth * 0.8)
    setSize((isMobile) ? window.innerWidth : window.innerWidth * 0.8 / 3 - 16)
  }, [])

  function renderContent() {
    return (
      <div style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', flexWrap: 'wrap' }}>
        <Typography style={{ textAlign: 'start' }} variant="h3" paragraph>
          TensorFlow Practices
        </Typography>
        <Typography paragraph>
          TensorFlow Practices includes some projects using neural networks.<br />
          Select the feature you want to try. Some features are experimental and works on limited environment only.
        </Typography>
        <div style={{ width: contentWidth }}>
          <GridList cols={(isMobile) ? 1 : 3}>
            {menu.map(item => (
              <ListItem style={{ width: size, height: (isMobile) ? 200 : size / 2, margin: 8 }} key={item.title} button onClick={() => router.push(item.uri)}>
                <GridListTile style={{ width: size, borderColor: 'gray', borderWidth: 1 }}>
                  {/* <Typography paragraph>{item.title}</Typography> */}
                  {/* <Typography paragraph>{item.description}</Typography> */}
                  <img width={size} height={(isMobile) ? 200 : size / 2} />
                  <GridListTileBar title={item.title} subtitle={item.description} />
                </GridListTile>
              </ListItem>
            ))}
          </GridList>
        </div>
      </div>
    )
  }

  return <Page content={renderContent()} />
}