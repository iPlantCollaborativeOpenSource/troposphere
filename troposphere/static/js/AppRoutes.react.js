

import React from 'react/addons';
import Router from 'react-router';

let Route = Router.Route,
    Redirect = Router.Redirect,
    DefaultRoute = Router.DefaultRoute;

import Master from './components/Master.react';
import BadgeMaster from './components/badges/BadgeMaster.react';
import MyBadges from './components/badges/MyBadges.react';
import AllBadges from './components/badges/AllBadges.react';
import UnearnedBadges from './components/badges/UnearnedBadges.react';
import PassThroughHandler from './components/PassThroughHandler.react';
import DashboardPage from './components/dashboard/DashboardPage.react';
import ProjectListPage from './components/projects/ProjectListPage.react';
import ImageListPage from './components/images/ImageListPage.react';
import ImageDetailsPage from './components/images/ImageDetailsPage.react';
import ProviderDetailsPage from './components/providers/ProviderListView.react';
import HelpPage from './components/help/HelpPage.react';
import ProjectsMaster from './components/projects/ProjectsMaster.react';
import ProjectDetailsMaster from './components/projects/detail/ProjectDetailsMaster.react';
import ProjectDetailsPage from './components/projects/ProjectDetailsPage.react';
import ProjectResourcesPage from './components/projects/ProjectResourcesPage.react';
import FavoritedImagesPage from './components/images/FavoritedImagesPage.react';
import MyImagesPage from './components/images/MyImagesPage.react';
import MyImageRequestsPage from './components/images/MyImageRequestsPage.react';
import ImageTagsPage from './components/images/ImageTagsPage.react';
import ImagesMaster from './components/images/ImagesMaster.react';
import ProvidersMaster from './components/providers/ProvidersMaster.react';
import SettingsPage from './components/settings/SettingsPage.react';
import ProjectInstancePage from "./components/projects/InstanceDetailsPage.react";
import ProjectVolumePage from "./components/projects/VolumeDetailsPage.react";
import ResourceMaster from './components/admin/ResourceMaster.react';
import ResourceRequest from './components/admin/ResourceRequest.react';
import AdminMaster from './components/admin/AdminMaster.react';
import ImageMaster from './components/admin/ImageMaster.react';
import ImageAdmin from './components/admin/ImageAdmin.react';
import ResourceAdmin from './components/admin/ResourceAdmin.react';

let AppRoutes = (
    <Route name="root" path="/application" handler={Master}>
      <Route name="dashboard" handler={DashboardPage}/>

      <Route name="projects" handler={ProjectsMaster}>
        <Route name="project" path=":projectId" handler={ProjectDetailsMaster}>
          <Route name="project-details" path="details" handler={ProjectDetailsPage}/>
          <Route name="project-resources" path="resources" handler={ProjectResourcesPage}/>
          <Route name="project-instance-details" path="instances/:instanceId" handler={ProjectInstancePage}/>
          <Route name="project-volume-details" path="volumes/:volumeId" handler={ProjectVolumePage}/>
          <DefaultRoute handler={ProjectDetailsPage}/>
        </Route>

        <DefaultRoute handler={ProjectListPage}/>
      </Route>

      <Route name="images" handler={ImagesMaster}>
        <DefaultRoute name="search" handler={ImageListPage}/>
        <Route name="favorites" handler={FavoritedImagesPage}/>
        <Route name="authored" handler={MyImagesPage}/>
        <Route name="my-image-requests" handler={MyImageRequestsPage}/>
        <Route name="tags" handler={ImageTagsPage}/>
        <Route name="image-details" path=":imageId" handler={ImageDetailsPage}/>
      </Route>

      <Route name="providers" handler={ProvidersMaster}>
        <Route name="provider" path=":providerId" handler={ProviderDetailsPage}/>
        <DefaultRoute handler={ProviderDetailsPage}/>
      </Route>

      <Route name="help" handler={HelpPage}/>
      <Route name="settings" handler={SettingsPage}/>

      <Route name="admin" handler={AdminMaster}>
        <Route name="resource-request-manager" path="resource-requests" handler={ResourceMaster}>
          <Route name="resource-request" path=":resourceRequestId" handler={ResourceAdmin} />
        </Route>
        <Route name="image-request-manager" path="imaging-requests" handler={ImageMaster}>
          <Route name="image-request" path=":imageRequestId" handler={ImageAdmin} />
        </Route>
      </Route>

      <Route name="badges" handler={BadgeMaster}>
        <Route name="my-badges" path="my-badges" handler={MyBadges} />
        <Route name="all-badges" path="all-badges" handler={AllBadges} />
        <Route name="unearned-badges" path="unearned-badges" handler={UnearnedBadges} />
      </Route>

      <DefaultRoute handler={DashboardPage}/>

    </Route>
);

export default AppRoutes;

