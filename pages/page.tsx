import React, { useState } from 'react';
import clsx from 'clsx'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { useStyles } from '../public/assets/styles/styles';
import { Link, Drawer, ListItem, ListItemText, Divider, List, IconButton, useTheme } from '@material-ui/core';
import { useRouter } from 'next/router';
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Header from './Header';

const menu = [{ "title": "Image Classification", "uri": "image-classification" },
{ "title": "Object detection", "uri": "object-detection" },
{ "title": "Image Object Detection", "uri": "image-object-detection" },
{ "title": "Natural Language Q&A", "uri": "natural-language-qa" },
{ "title": "Toxicity Classification", "uri": "toxicity-classifier" }]

export default function Page({ content, header = <Header /> }) {
    const classes = useStyles();
    const router = useRouter()
    const theme = useTheme()
    const [open, setOpen] = useState(false);

    return (
        <div className={classes.root}>
            {header}
            <AppBar position="fixed" className={clsx(classes.appBar, {
                [classes.appBarShift]: open,
            })}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={() => setOpen(true)}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Link href="/" color="inherit">
                        <Typography style={{ color: 'white' }} variant="h6" noWrap>TensorFlow Practices</Typography>
                    </Link>
                </Toolbar>
            </AppBar>
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Drawer
                className={classes.drawer}
                classes={{
                    paper: classes.drawerPaper,
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <div className={classes.drawerHeader} >
                    <ListItem>
                        <ListItemText primary={"©︎ Aizero 2020"} />
                    </ListItem>
                    <IconButton onClick={() => setOpen(false)}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    {menu.map((item) => (
                        <ListItem key={item.title} >
                            <Link href={"/" + item.uri} color="inherit">
                                <ListItemText primary={item.title} />
                            </Link>
                        </ListItem>
                    ))}
                </List>
            </Drawer >
            <main className={clsx(classes.content, {
                [classes.contentShift]: open,
            })}>
                <div className={classes.toolbar} />
                {content}
            </main>
        </div>
    )
}
