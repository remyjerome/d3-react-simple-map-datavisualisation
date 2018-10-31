const configColorMap = [
  {
    name:"P - R",
    label:"MNT_PR",
    conf: {
      scaleColor: {
        domain: [-1000000,0,1,25000,50000],
        range: ["rgba(255, 0, 0, 1)",
          "rgba(255, 0, 0, 1)",
          "rgba(193, 255, 0, 1)",
          "rgba(147, 255, 0, 1)",
          "rgba(102, 255, 0, 1)"]
      },

      legend: {
        width:300,
        ticks:5,
        domain:[-10000,50000],
        value:[-10000, 0,1,25000,50000]
      }
    }
  },
  {
    name:"Avenant",
    label:"PCT_AVT",
    conf: {
      scaleColor:{
        domain: [0,3,5],
        range: ["rgb(255, 0, 0)",
          "rgb(249, 198, 0)",
          "rgb(102, 255, 0)"]
      },
      legend: {
        width:300,
        ticks:5,
        domain:[0,5],
        value:[0,3,5]
      }
    }
  },
  {
    name:"Croissance Externe",
    label:"MNT_CEX",
    conf: {
      scaleColor: {
        domain: [0,1,25000,100000],
        range: ["rgba(238, 255, 0, 1)",
          "rgba(193, 255, 0, 1)",
          "rgba(147, 255, 0, 1)",
          "rgba(102, 255, 0, 1)"]
      },
      legend: {
        width:300,
        ticks:5,
        domain:[0,100000],
        value:[0,1,1,25000,100000]
      }
    }
  },
  {
    name:"Suivi Part De Marché",
    label:"nb_entr",
    conf: {
      scaleColor: {
        domain:[0,50, 40000],
        range: ["rgb(252, 252, 253)",
          "rgb(101, 51, 151)",
          "rgb(101, 51, 151)"]
      },
      legend: {
        width:300,
        ticks:5,
        domain:[0,50],
        value:[0, 50]
      }
    }
  },
  {
    name:"NB_CLI_AB_NA",
    label:"NB_CLI_AB_NA",
    conf: {
      scaleColor:{
        domain:[0,50, 40000],
        range: ["rgb(252, 252, 253)",
          "rgb(101, 51, 151)",
          "rgb(101, 51, 151)"]
      },
      legend: {
        width:300,
        ticks:5,
        domain:[-10000,50000],
        value:[-10000, 0,1,25000,50000]
      }
    }
  },
  {
    name:"MNT_PTF_AB_NA",
    label:"MNT_PTF_AB_NA",
    conf: {
      scaleColor: {
        domain:[0,50, 40000],
        range: ["rgb(252, 252, 253)",
          "rgb(101, 51, 151)",
          "rgb(101, 51, 151)"]
      },
      legend: {
        width:300,
        ticks:5,
        domain:[-10000,50000],
        value:[-10000, 0,1,25000,50000]
      }
    }
  }
]

export default configColorMap