//Use sample_values as the values for the bar chart.
// Use otu_ids as the labels for the bar chart.
//Use otu_labels as the hovertext for the chart.
d3.json("samples.json").then((incomingData) => {
    console.log(incomingData)
let selDataset = d3.select("#selDataset")
incomingData.names.forEach(refreshData => {
    selDataset.append("option").text(refreshData)
})
optionChanged(incomingData.names[0])
})


//writing a fuction to append demographic info box

function demoinfo(names_id) {
    d3.json("samples.json").then((incomingData) => {
let sample_metadata =  d3.select("#sample-metadata")     
sample_metadata.html("")
let fileteredid = incomingData.metadata.filter(metadataid => metadataid.id== names_id) [0]
 Object.entries(fileteredid).forEach(([key, value])=> {
    sample_metadata.append("h5").text(`${key}: ${value}`)
   
 })
})}

function optionChanged(names_id){
    demoinfo(names_id)
    plots(names_id)
 }


function plots(names_id) 
{    d3.json("samples.json").then    (        (incomingData) =>         {

        var sample_data = incomingData.samples
        console.log(sample_data)


        let samplefilter = sample_data.filter(sampleid => sampleid.id== names_id) [0]

            var samplevalue = samplefilter.sample_values.slice(0,10).reverse()
            var otuids = samplefilter.otu_ids.slice(0,10).reverse()
            var sotulabels = samplefilter.otu_labels.slice(0,10).reverse()
            console.log(samplevalue)
            console.log(otuids)
            console.log(sotulabels)

trace = [{
    x: samplevalue,
    y: otuids.map(id=>`OTU${id}`),
    type: "bar",
    text: sotulabels,
    orientation: "h"
        }]  
Plotly.newPlot("bar", trace)

trace1 = [{
    x: samplefilter.otu_ids,
    y: samplefilter.sample_values,

    text: samplefilter.otu_labels,

    mode: "markers",
    marker: {
        color: samplefilter.otu_ids,
        size: samplefilter.sample_values,

    }
        }]  
Plotly.newPlot("bubble", trace1)

        }
    )
}



