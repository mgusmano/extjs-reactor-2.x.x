"use strict";

import path from 'path';
import fs from 'fs';
import cjson from 'cjson';

export const buildXML = function({ compress }) {
    let compression = '';

    if (compress) {
        compression = `
            then 
            fs 
            minify 
                -yui 
                -from=ext.js 
                -to=ext.js
        `;
    }

    return `
        <project name="simple-build" basedir=".">
            <!--  internally, watch calls the init target, so need to have one here -->
            <target name="init"/>
            <target name="init-cmd">
                <taskdef resource="com/sencha/ant/antlib.xml"
                                classpath="\${cmd.dir}/sencha.jar"
                                loaderref="senchaloader"/>
                <x-extend-classpath>
                    <jar path="\${cmd.dir}/sencha.jar"/>
                </x-extend-classpath>
                <x-sencha-init prefix=""/>
                <x-compile refid="theCompiler"
                                 dir="\${basedir}"
                                 initOnly="true"
                                 inheritAll="true">
                          <![CDATA[
                          -classpath=\${basedir}/manifest.js
                          load-app
                              -temp=\${basedir}/temp
                              -tag=App
                    ]]>
                  </x-compile>
            </target>
            <target name="rebuild">
               <x-compile refid="theCompiler"
                          dir="\${basedir}"
                          inheritAll="true">
                  <![CDATA[
                  --debug
                  exclude
                  -all
                  and
                  include
                  -f=Boot.js
                  and
                  concatenate
                      ext.js
                  and
                  exclude
                  -all
                  and
                  # include theme overrides
                  include
                    -r
                    -tag=overrides
                  and
                  # include all js files needed for manifest.js
                  include
                      -r
                      -f=manifest.js
                  and
                  # exclude the generated manifest file itself,
                  # since we don't want the generated bundle file to create any components
                  exclude
                  -f=manifest.js
                  and
                  concatenate
                  +append
                      ext.js
                  and
                  scss
                      -appName=App
                      -imageSearchPath=resources
                      -themeName=triton
                      -resourceMapBase=.
                      -output=ext.scss
                  and
                  resources
                      -excludes=-all*.css
                      -out=resources
                  and
                  resources
                      -model=true
                      -out=resources
                  ]]>
               </x-compile>
            </target>
            <target name="build" depends="init-cmd,rebuild">
               <x-sencha-command dir="\${basedir}">
                   <![CDATA[
                   fashion
                       -pwd=.
                       -split=4095
                       ${compress ? '-compress' : ''}
                           ext.scss
                       ext.css
                   ${compression}
                   ]]>
               </x-sencha-command>
            </target>
            <target name="watch" depends="init-cmd,build">
                <x-fashion-watch
                        refName="fashion-watch"
                        inputFile="ext.scss"
                        outputFile="ext.css"
                        split="4095"
                        compress="${compress ? 'true' : 'false'}"
                        configFile="app.json"
                        fork="true"/>
                <x-watch compilerRef="theCompiler"
                         targets="rebuild"/>
            </target>
        </project>
    `.trim();
};

/**
 * Creates the app.json file
 * @param {String} theme The name of the theme to use.
 * @param {String[]} packages The names of packages to include in the build
 */
export function createAppJson({ theme, packages, toolkit, overrides=[], packageDirs=[] }) {
    const config = {
        framework: "ext",
        toolkit,
        requires: packages,
        overrides: overrides.map(dir => path.resolve(dir)).concat('jsdom-environment.js'),
        packages: {
            dir: packageDirs.map(dir => path.resolve(dir))
        },
        output: {
            base: '.',
            resources: {
                path: './resources',
                shared: "./resources"
            }
        }
    };

    // if theme is local add it as an additional package dir
    if (fs.existsSync(theme)) {
        const packageInfo = cjson.load(path.join(theme, 'package.json'));
        config.theme = packageInfo.name;
        config.packages.dir.push(path.resolve(theme));
    } else {
        config.theme = theme;
    }

    return JSON.stringify(config, null, 4);
}

/**
 * Creates a js file containing code to make Ext JS load properly in jsdom
 * @param {String} targetDir 
 */
export function createJSDOMEnvironment(targetDir) {
    return 'window.Ext = Ext;';
}

/**
 * Creates the workspace.json file
 * @param {String} sdk The path to the sdk
 */
export function createWorkspaceJson(sdk, packages, output) {
    return JSON.stringify({
        "frameworks": {
            "ext": path.relative(output, sdk)
        },
        "packages": {
            "dir": ['${workspace.dir}/packages/local', '${workspace.dir}/packages'].concat(packages).join(','),
            "extract": "${workspace.dir}/packages/remote"
        }
    }, null, 4);
}
