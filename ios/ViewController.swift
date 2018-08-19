//
//  ViewController.swift
//  Redmart
//
//  Created by Gautham Pai on 8/15/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

import UIKit

class ViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    @IBAction func onClickStartShopping(_ sender: UIButton) {
      
      /* You now start a react native view controller. Pass desired data to the React Native View */
      
      let jsCodeLocation = URL(string: "http://localhost:8081/index.bundle?platform=ios")
      
      let rootView = RCTRootView(
        bundleURL: jsCodeLocation,
        moduleName: "Redmart",
        initialProperties: nil,
        launchOptions: nil
      )
      
      let reactNativeViewController = UIViewController()
      reactNativeViewController.view = rootView
      self.present(reactNativeViewController,
                   animated: true,
                   completion: nil)
    }
    
    
    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destinationViewController.
        // Pass the selected object to the new view controller.
    }
    */

}
