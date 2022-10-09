//
//  NewnodePlugin.swift
//  App
//
//  Created by Tony Rewin on 16.03.2022.
//

import Foundation
import Capacitor
import NewNode

@objc(NewnodePlugin)
public class NewnodePlugin: CAPPlugin {
    @objc func echo(_ call: CAPPluginCall) {
        let value = call.getString("value") ?? ""
        call.resolve(["value": value])
    }
    @objc func start(_ call: CAPPluginCall) {
        let config = URLSessionConfiguration.default
        config.connectionProxyDictionary = NewNode.connectionProxyDictionary
        let session = URLSession(configuration: config)
        call.resolve(session) // TODO: check if it can return object
    }
}
