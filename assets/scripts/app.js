$(document).ready(function () {
  var snap = Snap('#svg')
    , bigCircle = snap.circle(150, 150, 100).attr({
        fill: '#bada55',
        stroke: '#000',
        strokeWidth: 5
      })

  Snap.load('../demo.svg', function (f) {
    f.select('#base-right').transform((new Snap.Matrix()).scale(0.2))
    snap.append(f)
  })
})
