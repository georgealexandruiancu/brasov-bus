import React from 'react';

import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import MainPage from './pages/main';
import ParseAll from './pages/parseAll';


export default () =>
    (
        <BrowserRouter>
            <div>
                <Route exact path="/" component={MainPage} />
                <Route path="/parseall" component={ParseAll} />

            </div>
        </BrowserRouter>
    )