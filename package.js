Package.describe({
    name: 'goinvo:synthea-analysis',
    version: '0.4.0',
    summary: 'Dashboard for Synthea analysis',
    git: 'https://github.com/symptomatic/synthea-analysis',
    documentation: 'README.md'
});
  
Package.onUse(function(api) {
    api.versionsFrom('1.4');
    
    api.use('meteor-base@1.4.0');
    api.use('ecmascript@0.13.0');
    api.use('react-meteor-data@2.1.2');
    api.use('session');
    api.use('mongo');
     
    api.use('clinical:hl7-fhir-data-infrastructure');

    api.addAssets('data/Agustín529_Caldera106_01358a2c-d615-85fe-1665-cbb1b3feeeaa.json', 'client');
    api.addAssets('data/Andrea7_Santillán790_befab5de-4562-37da-07d3-1a2b188b679a.json', 'client');
    api.addAssets('data/Ann985_Medhurst46_c7f40e00-f81b-a1cc-8940-9bb3ea4cb235.json', 'client');
    api.addAssets('data/Annmarie79_Erdman779_f4e841bc-b078-6d1d-f621-476d6481aa4d.json', 'client');
    api.addAssets('data/Antonio44_Schoen8_6e19e5f1-f802-1cc0-16b6-ef393edb9c77.json', 'client');
    api.addAssets('data/Arla414_Keebler762_e74553c0-d3be-b0bf-c615-52144a31e2ca.json', 'client');
    api.addAssets('data/Avery919_Wuckert783_50aa2899-6206-d8d4-ff9d-26991774a4f2.json', 'client');
    api.addAssets('data/Bailey598_Ernser583_0b1ea7e3-1684-b771-bb09-a16454457a13.json', 'client');
    api.addAssets('data/Beau391_Feeney44_56dbdfed-f89b-1a6e-b51d-5bb656821ecc.json', 'client');
    api.addAssets('data/Bert917_Sanford861_c753b379-b8f4-4b90-d734-535eb90d3d70.json', 'client');
    api.addAssets('data/Billye739_Rau926_06d367b1-bf0b-3bf9-dff7-8bebaf29236b.json', 'client');
    api.addAssets('data/Bobbie849_Little434_5a9f0c17-da61-aad7-78f0-4272f14ad0c9.json', 'client');
    api.addAssets('data/Brendan864_Stiedemann542_846638bf-7b7c-b69c-52d8-68b73dac2a69.json', 'client');
    api.addAssets('data/Buddy254_Pfannerstill264_662e4572-69ba-b4cb-133a-463017c94b5b.json', 'client');
    api.addAssets('data/Catheryn300_Goldner995_9b91223d-e57d-d7b5-8a9f-95a9574cf8ac.json', 'client');
    api.addAssets('data/Chuck784_Hagenes547_c7d066cf-49d5-1e9a-e1da-0b0dd93ddf24.json', 'client');
    api.addAssets('data/Chuck784_McDermott739_52671db7-a2ac-9edb-b980-929e95969938.json', 'client');
    api.addAssets('data/Clarence5_Stiedemann542_ac457738-a434-ddd6-ca73-3d83350a9551.json', 'client');
    api.addAssets('data/Clifford177_Balistreri607_c295c569-6e89-4885-53f1-c1e11d0c4bc7.json', 'client');
    api.addAssets('data/Colton403_Kozey370_7bca8823-6111-72fc-8280-671ee69175e8.json', 'client');
    api.addAssets('data/Daniel959_Metz686_eed35074-d272-5e3c-87ec-eac9018ccf5c.json', 'client');
    api.addAssets('data/Danna372_Beier427_c805dcec-e9f9-4c10-d8a0-09de359943c7.json', 'client');
    api.addAssets('data/Darell496_Wiegand701_fca97d63-8ec3-0dba-4362-999f88eb1fca.json', 'client');
    api.addAssets('data/Daryl568_Treutel973_e8c8d4ae-60dc-b850-4db2-316f918db233.json', 'client');
    api.addAssets('data/Deeanna316_Okuneva707_ea748a94-35ab-ede8-7f9c-722a5640fe72.json', 'client');
    api.addAssets('data/Delmy607_Stracke611_dbe806ed-41e1-4d57-47e2-cedc6a81415b.json', 'client');
    api.addAssets('data/Denese626_Cassin499_122fd649-ee86-f92b-592a-7bc32b96647a.json', 'client');
    api.addAssets('data/Dominick530_Casper496_5c63c558-7ebb-70cb-1000-bc456a630b44.json', 'client');
    api.addAssets('data/Doretta917_Hilll811_a97e3231-8305-e7f9-3935-3a7db24d8aff.json', 'client');
    api.addAssets('data/Ellan282_Kub800_ad053b2e-95e7-6f4d-edaf-01d20c28344b.json', 'client');
    api.addAssets('data/Euna523_Rohan584_baea3663-e93c-168e-d832-164427de1430.json', 'client');
    api.addAssets('data/Felica690_Schulist381_5f6b19bf-b53e-bf78-ce81-ccb87f3a797b.json', 'client');
    api.addAssets('data/Francine922_Heidenreich818_9d34f621-3c1a-2cae-e57b-33a927acfd6e.json', 'client');
    api.addAssets('data/Freeman822_Jones311_93d4b759-5303-ddcb-7c02-d65268e4385f.json', 'client');
    api.addAssets('data/Gabriel934_Hoeger474_51fa019c-f48f-3b24-5053-97fe56506c31.json', 'client');
    api.addAssets('data/Giselle809_Rempel203_7ec0ca52-10ea-8c1d-8552-6304c98700d6.json', 'client');
    api.addAssets('data/Griselda377_Donnelly343_fddc0b47-bfda-93f9-a542-ba86ab380c5a.json', 'client');
    api.addAssets('data/Grover559_Kulas532_f53e9cea-a070-1200-b7c9-b75a80b963ec.json', 'client');
    api.addAssets('data/Guy979_Champlin946_f740998f-f1b8-cdef-263d-6d652b1ac4c3.json', 'client');
    api.addAssets('data/Hayden835_Feeney44_e37abbeb-f024-c3bf-71cc-a7df3459c1d4.json', 'client');
    api.addAssets('data/Hung902_Greenholt190_e993ee7d-b7f7-854f-5090-2bd69bebf750.json', 'client');
    api.addAssets('data/Jamal145_Mertz280_fb5e2a46-7336-1201-cfaf-8dbda4bdef06.json', 'client');
    api.addAssets('data/Jasmine145_Crona259_ace286a4-c2e0-9026-b867-c7de866dc96d.json', 'client');
    api.addAssets('data/Javier97_Valdez992_db65c9ad-d78a-222a-4b2b-40c701d27c50.json', 'client');
    api.addAssets('data/Jewell855_Corwin846_2ab43305-8025-3805-4721-3ec0edde5522.json', 'client');
    api.addAssets('data/Jina946_Moen819_9d330ce3-44fa-afe0-5b38-f96a39c8dce3.json', 'client');
    api.addAssets('data/Jonas187_Marquardt819_5a090d5c-6183-9268-deec-12f8e996933b.json', 'client');
    api.addAssets('data/Josue598_Kutch271_168e3f72-8c3a-ad5a-e7ac-7367806fcacb.json', 'client');
    api.addAssets('data/Joycelyn213_Will178_28e391e4-404c-8de0-2d02-b091f7605a2a.json', 'client');
    api.addAssets('data/Kanesha23_Davis923_2bd37adb-82ca-1d5e-ca73-86f4f4e22686.json', 'client');
    api.addAssets('data/Karleen110_Treutel973_7608eab3-5765-7ed6-ff86-717a53b87f5c.json', 'client');
    api.addAssets('data/Katherine209_Ankunding277_50c8f4c8-0942-55a7-924f-d80c256064dc.json', 'client');
    api.addAssets('data/Kelsi424_Wehner319_384332df-af9b-5453-ef61-e129387b0a50.json', 'client');
    api.addAssets('data/Lelia627_Hegmann834_b206dd65-1f5b-e3a6-04b7-2a423b959246.json', 'client');
    api.addAssets('data/Leo278_Waelchi213_4adb8c0c-5412-41f6-8139-5c3496e5bfbe.json', 'client');
    api.addAssets('data/Leticia253_Blanco851_c4de1902-5d2e-812d-2397-62603fbe2e53.json', 'client');
    api.addAssets('data/Liz413_Hammes673_125657ce-ae3a-efc6-7d02-d72acc1543a4.json', 'client');
    api.addAssets('data/Lurline371_Prosacco716_857df844-0093-635a-5872-a093309b8343.json', 'client');
    api.addAssets('data/Marilynn608_Cronin387_ba322860-44c4-1b8d-773f-c7819d7f60ad.json', 'client');
    api.addAssets('data/Marty115_Cummings51_4cfd8114-c114-2753-fc6f-b13978238b99.json', 'client');
    api.addAssets('data/Mathew182_Brekke496_ba521dcf-4771-e30e-d525-1a9936d71352.json', 'client');
    api.addAssets('data/Meg231_Sporer811_caf19654-88f3-3369-5d33-cca1dc74ec0b.json', 'client');
    api.addAssets('data/Mikki421_Hilpert278_ca6521ce-3823-20c9-e68b-9137547bed81.json', 'client');
    api.addAssets('data/Mireya881_Cronin387_7b389105-fa6a-a379-f60a-d4cc07746cd3.json', 'client');
    api.addAssets('data/Mirta419_Flatley871_13fa074c-5b80-99c4-4b6b-0679bd96755f.json', 'client');
    api.addAssets('data/Molly175_Ritchie586_b2728d90-65eb-93e8-a4bc-8ebb61e8f5ed.json', 'client');
    api.addAssets('data/Moses679_Armstrong51_2d8d9e6e-bb91-78ef-c99e-5351da5d13d0.json', 'client');
    api.addAssets('data/Myron933_McDermott739_c0809ac5-e4cc-f8f3-a6f3-3ac9d1fb63b3.json', 'client');
    api.addAssets('data/Nadine465_Daniel959_5b011bbb-548f-e1fd-3a97-151796d12c58.json', 'client');
    api.addAssets('data/Neville893_Nienow652_3c166220-7efa-e711-ae0e-7245a8728379.json', 'client');
    api.addAssets('data/Nigel915_Steuber698_a5e148ad-ede3-2afb-a3c4-f02dc8328ca4.json', 'client');
    api.addAssets('data/Oretha285_Towne435_d9f77406-8010-0c31-60cb-5832ced0ebf7.json', 'client');
    api.addAssets('data/Pei116_Wilderman619_0b432720-a8b6-8314-12a4-0c9f839d721e.json', 'client');
    api.addAssets('data/Pete38_Gerlach374_c630a557-a7ea-ced5-b072-5954775d19c3.json', 'client');
    api.addAssets('data/Porfirio146_Hermiston71_a7c4f081-51ab-84d7-9488-15c2d8236328.json', 'client');
    api.addAssets('data/Raleigh478_Batz141_0aa07f50-e335-16aa-cdd8-85fa4049faf1.json', 'client');
    api.addAssets('data/Rayford811_Hegmann834_41458a0b-c1e0-3a75-ce9d-95542f5f3dde.json', 'client');
    api.addAssets('data/Ricardo560_Klocko335_de74446d-31de-a6c8-f2a7-93374dd19eca.json', 'client');
    api.addAssets('data/Ricardo560_Vélez150_b9d62de8-f70b-09b2-1e6c-6ab47fae02c1.json', 'client');
    api.addAssets('data/Roberto515_Veum823_023cba6e-da66-d73e-56e2-88d4d13d0f26.json', 'client');
    api.addAssets('data/Ronni748_Yundt842_226bf9b4-7e4e-1931-ee5b-60f3ea1b7899.json', 'client');
    api.addAssets('data/Roxanna261_Beahan375_919f7be3-4f6d-d09c-72df-55c18c45d07f.json', 'client');
    api.addAssets('data/Scottie437_Becker968_73e3eef4-acdb-dcea-d5f0-4a1af2ca75c0.json', 'client');
    api.addAssets('data/Shani239_Jaskolski867_2b550cf9-56d9-c324-5c78-1cf16d4c6a89.json', 'client');
    api.addAssets('data/Sharie942_Schmeler639_9973bc6e-91b3-f8f0-6ae5-f6205d9e269c.json', 'client');
    api.addAssets('data/Shirleen968_Little434_5e6ff1da-5cc7-c071-94c9-84ce47080a7f.json', 'client');
    api.addAssets('data/Slyvia34_Muller251_0faede31-74a1-c3e1-5cc8-7dbaf2adfb4e.json', 'client');
    api.addAssets('data/Therese102_Gerlach374_17cbe576-66a2-b11e-13ec-1b53c143d70c.json', 'client');
    api.addAssets('data/Thomas756_Gerlach374_a40dd069-d0ed-2b94-c367-aed07a9153bd.json', 'client');
    api.addAssets('data/Thomasina264_Mueller846_bf2d4140-3064-f063-724f-7b03d47d9410.json', 'client');
    api.addAssets('data/Timmy68_Koch169_ac2edfea-2855-1cfa-e42a-1297b0932d39.json', 'client');
    api.addAssets('data/Tobias236_Schumm995_b1c6720e-18b9-60dc-c1a0-418895c6b75a.json', 'client');
    api.addAssets('data/Trevor374_Sipes176_2470444b-6d3b-5bfe-bc3e-406c8cfbc99e.json', 'client');
    api.addAssets('data/Valene773_Bode78_39d5438a-26c3-cf96-6ef5-2b8e2fa2c09c.json', 'client');
    api.addAssets('data/Vernon254_Bogisich202_417e1c9a-6877-5226-7076-e0a02007f142.json', 'client');
    api.addAssets('data/Vi771_Marks830_da1b3aa5-1e79-55b4-30da-1be8dda33c0e.json', 'client');
    api.addAssets('data/Wendolyn786_Auer97_26b6e107-abcc-8684-fc4a-dfc08513aae5.json', 'client');
    api.addAssets('data/Wes853_Boyer713_15c92839-a5b3-54d4-9c31-eae6b8930444.json', 'client');
    api.addAssets('data/Wilbert25_Collier206_84ae5318-5dd5-72fb-f046-eaffdee58d22.json', 'client');
    api.addAssets('data/Willie882_Glover433_b5912d7b-c49f-c0f0-914d-a5a8741a2414.json', 'client');
    api.addAssets('data/Xochitl483_Bailey598_613bc38b-65ba-2011-2bf8-b2e9fb135b9e.json', 'client');

    api.addFiles('lib/methods.js', 'server');
    api.addFiles('lib/Collections.js', ['client', 'server']);
    api.addFiles('lib/MedicalRecordImporter.js', ['client', 'server']);

    if(Package['symptomatic:data-management']){
        api.use('symptomatic:data-management');
    }

    api.mainModule('index.jsx', 'client');
});


Npm.depends({    
    // "@nivo/radar": "0.66.0",
    // "@nivo/pie": "0.61.1",
    

    "hgraph-react": "0.0.7",
    "d3-scale": "3.0.1"    
})