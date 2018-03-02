import React, { Component } from 'react'
import { Panel, Video } from '@extjs/ext-react';

export default function VideoExample() {
    return (
        <Panel shadow layout="fit" autoSize={false}>
            <Video 
                loop 
                url={['resources/video/BigBuck.m4v', 'resources/video/BigBuck.webm']}
                posterUrl="resources/images/cover.jpg"
            />
        </Panel>
    );
}