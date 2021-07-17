import { ListItemText } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar/Avatar';
import List from '@material-ui/core/List/List';
import ListItem from '@material-ui/core/ListItem/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar/ListItemAvatar';
import LocalBarIcon from '@material-ui/icons/LocalBar';
import React from 'react';

type WineData = {
    title: string,
    country: string,
}

export type WineCollectionProps = React.ComponentProps<typeof List> & {
    data: [WineData]
}

const WineCollection:React.FC<WineCollectionProps> = (props:WineCollectionProps) => {
    const {
        data
    } = props;

    return (
        <List>
        {data.map((wine, i)=>{
            return (
                <ListItem key={`${wine.title}-${i}`}>
                    <ListItemAvatar>
                        <Avatar>
                            <LocalBarIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                    primary={wine.title}
                    secondary={wine.country}
                    />
                </ListItem>
            )
        })}
        </List>
    );
};

export default WineCollection;