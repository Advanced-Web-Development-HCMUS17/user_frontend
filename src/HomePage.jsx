import React from 'react';

import Header from "./component/Header";

export default function Home({userInfo}) {

    return (
        <div>
            <div>
                <Header/>
            </div>
            <div>Home body</div>
            <div>{userInfo.name}</div>
        </div>
    );
}
