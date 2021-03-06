var images = ee.ImageCollection("LANDSAT/LT05/C01/T1_TOA"),
    builtup = /* color: #d62918 */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Polygon(
                [[[90.42063474655151, 24.748331466931205],
                  [90.42320966720581, 24.748974532969772],
                  [90.42142868041992, 24.75070884600183]]]),
            {
              "class": 0,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[90.42486190795898, 24.74681147943251],
                  [90.42366027832031, 24.748331466931205],
                  [90.42164325714111, 24.74762993654916]]]),
            {
              "class": 0,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[90.41988372802734, 24.749480856881753],
                  [90.4218578338623, 24.752871499884517],
                  [90.41923999786377, 24.753417111956633]]]),
            {
              "class": 0,
              "system:index": "2"
            })]),
    nonbuiltup = /* color: #2eff81 */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Polygon(
                [[[90.38415670394897, 24.77648684698737],
                  [90.38434982299805, 24.777636308190583],
                  [90.37696838378906, 24.778532490896566]]]),
            {
              "class": 1,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[90.43271541628201, 24.73459211136461],
                  [90.43971061739285, 24.727341972142707],
                  [90.44082641634304, 24.727965656643818],
                  [90.4334878924783, 24.73517678159757]]]),
            {
              "class": 1,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[90.43498992952664, 24.71194376980251],
                  [90.4453754428323, 24.71229463612679],
                  [90.44168472322781, 24.717206660836396],
                  [90.4312562945779, 24.71471168838009]]]),
            {
              "class": 1,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[90.4198408126831, 24.705666993171533],
                  [90.41559219360352, 24.71467270314641],
                  [90.41370391845703, 24.71463371879278]]]),
            {
              "class": 1,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[90.33988953684457, 24.77052274143784],
                  [90.33885956858285, 24.705665002348827],
                  [90.40409089182504, 24.704105505868405]]]),
            {
              "class": 1,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[90.3894567489624, 24.7740709943394],
                  [90.3920316696167, 24.773291677388375],
                  [90.39499282836914, 24.772122692789495],
                  [90.39846897125244, 24.770719896742385],
                  [90.40250301361084, 24.769161215879972],
                  [90.40168762207031, 24.770213327608214],
                  [90.39812564849854, 24.77344754116993],
                  [90.39319038391113, 24.775473752523283],
                  [90.38804054260254, 24.775707544012896]]]),
            {
              "class": 1,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[90.4468345589703, 24.72765270847117],
                  [90.45061110926326, 24.706289680675418],
                  [90.45850753260311, 24.705665887555515],
                  [90.45764922571834, 24.7270290224012]]]),
            {
              "class": 1,
              "system:index": "6"
            })]);



//Visual Parameters for RGB composite of Landsat 5
var visParamsRGB_L5 = {bands: ['B3', 'B2', 'B1'], max: 0.3};

//Visual Parameters for False Color composite for Landsat 5
var visParamsFalse_L5 = {bands: ['B4', 'B3', 'B2'], max: 0.3};

var calculate = function(name, areaname, ULY, ULX, LRY, LRX){
/*
ULX = Upper left longitude
ULY = Upper left latitude
LRX = Lower right longitude
LRY = Lower right latitude

*/
  print("Hello, " + name +'.');
  var roi = ee.Geometry.Polygon([
    [[ULX,ULY], [LRX, ULY], [LRX,LRY], [ULX,LRY]]
  ]);
  Map.setCenter(ULX,ULY,11);
  var unclipped = images.filterBounds(roi);
  var unclipped_1991 = ee.ImageCollection(unclipped
    .filterDate('1991-01-01','1992-01-01')
    // .sort('CLOUD_COVER')
    // .first()
  );
  var unclipped_2001 = ee.ImageCollection(unclipped
    .filterDate('2001-01-01','2002-01-01')
    // .sort('CLOUD_COVER')
    // .first()
  );
  var unclipped_2011 = ee.ImageCollection(unclipped
    .filterDate('2011-01-01','2012-01-01')
    // .sort('CLOUD_COVER')
    // .first()
  );
  
  // STEP 1 : START OF IMAGE COLLECTION
  print('1991',unclipped_1991);
  print('2001',unclipped_2001);
  print('2011',unclipped_2011);
  
 //COMMENT OUT AT THE TIME OF IMAGE COLLECTION
  Map.addLayer(roi);
  
  var image1991 = ee.Image('LANDSAT/LT05/C01/T1_TOA/LT05_137043_19910126').clip(roi); 
  Map.addLayer(image1991,visParamsRGB_L5,'1991');
 
  var image2001 = ee.Image('LANDSAT/LT05/C01/T1_TOA/LT05_137043_20010121').clip(roi); 
  Map.addLayer(image2001,visParamsRGB_L5,'2001');
  
 
  var image2011 = ee.Image('LANDSAT/LT05/C01/T1_TOA/LT05_137043_20110407').clip(roi); 
  Map.addLayer(image2011,visParamsRGB_L5,'2011');
  
/* 
  STEP 3 : TRAINING DATA
  Do in only on 1991 image. Uncheck 2001 and 2011 images. Create FeatureCollection, add class label and class values

*/

  // Use these bands for prediction.
  var bands = ['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7'];

  // Load a Landsat 8 image to be used for prediction.
  image1991 = image1991.select(bands);
  image2001 = image2001.select(bands);
  image2011 = image2011.select(bands);

  // Load training points. The numeric property 'class' stores known labels.
  var points = builtup.merge(nonbuiltup);

  // Overlay the points on the imagery to get training.
  var training1991 = image1991.sampleRegions({
    collection: points,
    properties: ['class'],
    scale: 30
  });
  var training2001 = image2001.sampleRegions({
    collection: points,
    properties: ['class'],
    scale: 30
  });
  var training2011 = image2011.sampleRegions({
    collection: points,
    properties: ['class'],
    scale: 30
  });

  // Train a CART classifier with default parameters.
  var trained1991 = ee.Classifier.cart().train(training1991, 'class', bands);
  var trained2001 = ee.Classifier.cart().train(training2001, 'class', bands);
  var trained2011 = ee.Classifier.cart().train(training2011, 'class', bands);

  // Classify the image with the same bands used for training.
  var classified1991 = image1991.select(bands).classify(trained1991).clip(roi);
  var classified2001 = image2001.select(bands).classify(trained2001).clip(roi);
  var classified2011 = image2011.select(bands).classify(trained2011).clip(roi);

  // Display the inputs and the results.
  Map.addLayer(classified1991, {min: 0, max: 1, palette: ['FF0000','00FF00']}, '1991 classification');
  Map.addLayer(classified2001, {min: 0, max: 1, palette: ['FF0000','00FF00']}, '2001 classification');
  Map.addLayer(classified2011, {min: 0, max: 1, palette: ['FF0000','00FF00']}, '2011 classification');



  var area = ee.Image.pixelArea();

  //1991 Built up area
  var builtup_classfication = classified1991.select('classification').eq(0);
  builtup_classfication = builtup_classfication.updateMask(builtup_classfication);
  var builtup_classfication_area = builtup_classfication.multiply(area).rename('builtup_classfication_area');
  var stats_builtup = builtup_classfication_area.reduceRegion({
      reducer: ee.Reducer.sum(), 
      geometry: roi, 
      scale: 30,
    });
  var builtup1991_areaKm = ee.Number(stats_builtup.get('builtup_classfication_area')).divide(1000000);
  print('1991 Built up Area', builtup1991_areaKm);

  //1991 Non Built up area
  var nonbuiltup_classfication = classified1991.select('classification').eq(1);
  nonbuiltup_classfication = nonbuiltup_classfication.updateMask(nonbuiltup_classfication);
  var nonbuiltup_classfication_area = nonbuiltup_classfication.multiply(area).rename('nonbuiltup_classfication_area');
  var stats_nonbuiltup = nonbuiltup_classfication_area.reduceRegion({
      reducer: ee.Reducer.sum(), 
      geometry: roi, 
      scale: 30,
    });
  var nonbuiltup1991_areaKm = ee.Number(stats_nonbuiltup.get('nonbuiltup_classfication_area')).divide(1000000);
  print('1991 Non Built up Area', nonbuiltup1991_areaKm);

  var areaKm = ee.Number(0);
  print('1991 Total Area: ', areaKm.add(builtup1991_areaKm).add(nonbuiltup1991_areaKm));  

  //2001 Built up area
  builtup_classfication = classified2001.select('classification').eq(0);
  builtup_classfication = builtup_classfication.updateMask(builtup_classfication);
  builtup_classfication_area = builtup_classfication.multiply(area).rename('builtup_classfication_area');
  stats_builtup = builtup_classfication_area.reduceRegion({
      reducer: ee.Reducer.sum(), 
      geometry: roi, 
      scale: 30,
    });
  var builtup2001_areaKm = ee.Number(stats_builtup.get('builtup_classfication_area')).divide(1000000);
  print('2001 Built up Area', builtup2001_areaKm);

  //2001 Non Built up area
  nonbuiltup_classfication = classified2001.select('classification').eq(1);
  nonbuiltup_classfication = nonbuiltup_classfication.updateMask(nonbuiltup_classfication);
  nonbuiltup_classfication_area = nonbuiltup_classfication.multiply(area).rename('nonbuiltup_classfication_area');
  stats_nonbuiltup = nonbuiltup_classfication_area.reduceRegion({
      reducer: ee.Reducer.sum(), 
      geometry: roi, 
      scale: 30,
    });
  var nonbuiltup2001_areaKm = ee.Number(stats_nonbuiltup.get('nonbuiltup_classfication_area')).divide(1000000);
  print('2001 Non Built up Area', nonbuiltup2001_areaKm);

  areaKm = ee.Number(0);
  print('2001 Total Area: ', areaKm.add(builtup2001_areaKm).add(nonbuiltup2001_areaKm)); 
  
  //2011 Built up area
  builtup_classfication = classified2011.select('classification').eq(0);
  builtup_classfication = builtup_classfication.updateMask(builtup_classfication);
  builtup_classfication_area = builtup_classfication.multiply(area).rename('builtup_classfication_area');
  stats_builtup = builtup_classfication_area.reduceRegion({
      reducer: ee.Reducer.sum(), 
      geometry: roi, 
      scale: 30,
    });
  var builtup2011_areaKm = ee.Number(stats_builtup.get('builtup_classfication_area')).divide(1000000);
  print('2011 Built up Area', builtup2011_areaKm);

  //2011 Non Built up area
  nonbuiltup_classfication = classified2011.select('classification').eq(1);
  nonbuiltup_classfication = nonbuiltup_classfication.updateMask(nonbuiltup_classfication);
  nonbuiltup_classfication_area = nonbuiltup_classfication.multiply(area).rename('nonbuiltup_classfication_area');
  stats_nonbuiltup = nonbuiltup_classfication_area.reduceRegion({
      reducer: ee.Reducer.sum(), 
      geometry: roi, 
      scale: 30,
    });
  var nonbuiltup2011_areaKm = ee.Number(stats_nonbuiltup.get('nonbuiltup_classfication_area')).divide(1000000);
  print('2011 Non Built up Area', nonbuiltup2011_areaKm);

  areaKm = ee.Number(0);
  print('2011 Total Area: ', areaKm.add(builtup2011_areaKm).add(nonbuiltup2011_areaKm)); 
  
  // Create a task that you can launch from the Tasks tab.
  Export.image.toDrive({
    image: classified1991,
    description: 'classified1991',
    scale: 30,
    region: roi
  });
  
  Export.image.toDrive({
    image: classified2001,
    description: 'classified2001',
    scale: 30,
    region: roi
  });

  Export.image.toDrive({
    image: classified2011,
    description: 'classified2011',
    scale: 30,
    region: roi
  });

  Map.addLayer(roi);
   // COMMENT TILL HERE
};

//Input: Latitude and Longitude (2 decimal places) of upper left and lower right corner 
calculate('Saiful', 'Ghorashal',  23.953779, 90.618854, 23.930561, 90.648548);



