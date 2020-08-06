/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2019 Looker Data Sciences, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

import React, { useCallback, useContext } from 'react'
import { EmbedProps } from './types'
import { LookerEmbedSDK, LookerEmbedDashboard } from '@looker/embed-sdk'
import {
  ExtensionContext,
  ExtensionContextData,
} from '@looker/extension-sdk-react'
import { Button, Heading, Label, ToggleSwitch } from '@looker/components'
import { SandboxStatus } from '../SandboxStatus'
import { EmbedContainer } from './components/EmbedContainer'

export const EmbedDashboard: React.FC<EmbedProps> = () => {
  const [dashboardNext, setDashboardNext] = React.useState(true)
  const [running, setRunning] = React.useState(true)
  const [dashboard, setDashboard] = React.useState<LookerEmbedDashboard>()
  const extensionContext = useContext<ExtensionContextData>(ExtensionContext)
  const [dashConfig, setDashConfig] = React.useState<any>()

  const toggleDashboard = () => {
    setDashboardNext(!dashboardNext)
  }

  const canceller = (event: any) => {
    console.log(event)
    return { cancel: !event.modal }
  }

  const clickHandler = (event: any) => {
    console.log(event)
    return { cancel: !event.modal }
  }

  const updateRunButton = (running: boolean) => {
    setRunning(running)
  }

  const setupDashboard = (dashboard: LookerEmbedDashboard) => {
    setDashboard(dashboard)
  }

  const resetChanges = (dash: any) => {
    let newOptions = JSON.parse(JSON.stringify(dashConfig.dashboard.options))
    dashboard?.setOptions(newOptions)
  }

  const hideTiles = (tiles: any) => {

    const ids = [196,198,204]
    let currentConfig = JSON.parse(JSON.stringify(dashConfig.dashboard.options.layouts))
    let keepTiles = currentConfig[0]['dashboard_layout_components'].filter((element:any) => {
      if (!ids.includes(element.id)) {
        return element
      }
    });
    currentConfig[0]['dashboard_layout_components'] = keepTiles

    let newConfig = {
      layouts: currentConfig
    }

    dashboard?.setOptions(newConfig) 
  }

  const applyFilters = (click: any) => {
    dashboard?.updateFilters({'Ancillary':'Seats,Pets'})
  }

  const swapLayout = (layout: any) => {
    let currentConfig = JSON.parse(JSON.stringify(dashConfig.dashboard.options.layouts))
    currentConfig[0]['dashboard_layout_components'].forEach((element:any,index:any) => {
      element.row = index
      element.width = 24
    });
    console.log(currentConfig)
    let newConfig = {
      layouts: currentConfig
    }
    console.log(newConfig)
    dashboard?.setOptions(newConfig)
  }

  const updateNotes = (tiles: any) => {
    let testConfig = JSON.parse(JSON.stringify(dashConfig.dashboard.options))
    let currentConfig = JSON.parse(JSON.stringify(dashConfig.dashboard.options)) //JSON.parse(JSON.stringify(dashConfig.dashboard.options.elements))
    const ids = ['204','196','198','197','201']
    console.log(testConfig)
    for (const key in currentConfig.elements) {
      if (ids.includes(key)) {
        console.log('criteria met for notes')
        currentConfig.elements[key]['vis_config']['note_text'] = "here's some interesting new text for you to read!";
        // currentConfig[key]['vis_config']['type'] = 'looker_column';
      }
    }
    // const newConfig = {
    //   elements: currentConfig
    // }
    const newConfig = currentConfig
    console.log(newConfig)
    dashboard?.setOptions(newConfig)
  }

  const swapViz = (vizConfig: any) => {
    let currentConfig = JSON.parse(JSON.stringify(dashConfig.dashboard.options.elements))
    let vizToChange = ['202','206','207'] //['88','134','135'] 
    let xyz = {
      "x_axis_gridlines":false,
      "y_axis_gridlines":true,
      "show_view_names":false,
      "show_y_axis_labels":true,
      "show_y_axis_ticks":true,
      "y_axis_tick_density":"default",
      "y_axis_tick_density_custom":5,
      "show_x_axis_label":true,
      "show_x_axis_ticks":true,
      "y_axis_scale_mode":"linear",
      "x_axis_reversed":false,
      "y_axis_reversed":false,
      "plot_size_by_field":false,
      "trellis":"",
      "stacking":"",
      "limit_displayed_rows":false,
      "legend_position":"center",
      "point_style":"none",
      "show_value_labels":false,
      "label_density":25,
      "x_axis_scale":"auto",
      "y_axis_combined":true,
      "ordering":"none",
      "show_null_labels":false,
      "show_totals_labels":false,
      "show_silhouette":false,
      "totals_color":"#808080",
      "color_application":{
        "collection_id":"sabre-blues",
        "palette_id":"sabre-blues-categorical-0"
      },
      "y_axes":[
        {
          "label":"",
          "orientation":"left",
          "series":[
            {
              "axisId":"avg_sale_price",
              "id":"avg_sale_price",
              "name":"Avg Sale Price"
            }
          ],
          "showLabels":true,
          "showValues":true,
          "unpinAxis":false,
          "tickDensity":"default",
          "tickDensityCustom":5,
          "type":"linear"
        },
        {
          "label":null,
          "orientation":"right",
          "series":[
            {
              "axisId":"quantity_sold",
              "id":"quantity_sold",
              "name":"% Quantity Sold"
            }
          ],
          "showLabels":true,
          "showValues":true,
          "unpinAxis":false,
          "tickDensity":"default",
          "tickDensityCustom":5,
          "type":"linear"
        },
        {
          "label":null,
          "orientation":"right",
          "series":[
            {
              "axisId":"sale_amount",
              "id":"sale_amount",
              "name":"% Sale Amount"
            }
          ],
          "showLabels":true,
          "showValues":true,
          "unpinAxis":false,
          "tickDensity":"default",
          "tickDensityCustom":5,
          "type":"linear"
        }
      ],
      "series_types":{
    
      },
      "show_row_numbers":true,
      "transpose":false,
      "truncate_text":true,
      "hide_totals":false,
      "hide_row_totals":false,
      "size_to_fit":true,
      "table_theme":"editable",
      "enable_conditional_formatting":false,
      "header_text_alignment":"left",
      "header_font_size":"12",
      "rows_font_size":"12",
      "conditional_formatting_include_totals":false,
      "conditional_formatting_include_nulls":false,
      "show_sql_query_menu_options":false,
      "show_totals":true,
      "show_row_totals":true,
      "custom_color_enabled":true,
      "show_single_value_title":true,
      "show_comparison":true,
      "comparison_type":"value",
      "comparison_reverse_colors":false,
      "show_comparison_label":false,
      "type":"looker_column",
      "defaults_version":1,
      "hidden_fields":[
        "ticket_emd.Total_Sale_Amount",
        "ticket_emd.quantity_Sold"
      ]
    }
    for (const key in currentConfig) {
      if (vizToChange.includes(key)) {
        currentConfig[key]['vis_config'] = xyz;
        // currentConfig[key]['vis_config']['type'] = 'looker_column';
      }
    }
    const newConfig = {
      elements: currentConfig
    }
    console.log(currentConfig)
    // newConfig.dashboard.options.elements = currentConfig
    console.log(currentConfig)
    dashboard?.setOptions(newConfig)
    // dashboard?.run()
  }


  const dashboardTiles = (opts: any) => {
    console.log(opts)
    setDashConfig(opts)
    updateRunButton.bind(null, true)
  }

  const embedCtrRef = useCallback(el => {
    const hostUrl = extensionContext?.extensionSDK?.lookerHostData?.hostUrl
    if (el && hostUrl) {
      el.innerHTML = ''
      LookerEmbedSDK.init(hostUrl)
      const db = LookerEmbedSDK.createDashboardWithId(32) //15
      if (dashboardNext) {
        db.withNext()
      }
      db.appendTo(el)
        .withTheme('Sabre_2')
        .on('dashboard:loaded', dashboardTiles)
        .on('dashboard:run:start', updateRunButton.bind(null, true))
        .on('dashboard:run:complete', updateRunButton.bind(null, false))
        .on('drillmenu:click', clickHandler)
        .on('drillmodal:explore', canceller)
        .on('dashboard:tile:explore', canceller)
        .on('dashboard:tile:view', canceller)
        .build()
        .connect()
        .then(setupDashboard)
        .catch((error: Error) => {
          console.error('Connection error', error)
        })
    }
  }, [dashboardNext])

  const runDashboard = () => {
    if (dashboard) {
      dashboard.run()
    }
  }

  return (
    <>
      <Heading mt="xlarge">Embedded Dashboard</Heading>
      <SandboxStatus/>
      <Label htmlFor="toggle">
        Dashboard next
        <ToggleSwitch ml='small' onChange={toggleDashboard} on={dashboardNext} id='toggle'/>
      </Label>
      <Button m='medium' onClick={runDashboard} disabled={running}>Run Dashboard</Button>
      <Button m='medium' onClick={swapViz} disabled={running}>Swap Tables for Bars</Button>
      <Button m='medium' onClick={swapLayout} disabled={running}>Swap Layout</Button>
      {/* <Button m='medium' onClick={updateNotes} disabled={running}>Update Notes</Button> */}
      <Button m='medium' onClick={hideTiles} disabled={running}>Hide Tiles</Button>
      <Button m='medium' onClick={applyFilters} disabled={running}>Apply Filters</Button>
      <Button m='medium' onClick={resetChanges} disabled={running}>Reset Changes</Button>
      <EmbedContainer ref={embedCtrRef}/>
    </>
  )
}



