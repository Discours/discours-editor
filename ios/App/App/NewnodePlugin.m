//
//  NewnodePlugin.m
//  App
//
//  Created by Tony Rewin on 16.03.2022.
//

#import <Capacitor/Capacitor.h>

CAP_PLUGIN(NewnodePlugin, "Newnode",
    CAP_PLUGIN_METHOD(echo, CAPPluginReturnPromise);
    CAP_PLUGIN_METHOD(start, CAPPluginReturnPromise);
)
