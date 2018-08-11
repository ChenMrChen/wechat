<html>
 <head>
  <title>PHP ����</title>
 </head>
 <body>
 <?php 
 
 function getReqSign($params /* �������� */, $appkey /* �ַ���*/)
 {
     // 1. �ֵ���������
     ksort($params);
     
     // 2. ƴ��URL��ֵ��
     $str = '';
     foreach ($params as $key => $value)
     {
         if ($value !== '')
         {
             $str .= $key . '=' . urlencode($value) . '&';
         }
     }
     
     // 3. ƴ��app_key
     $str .= 'app_key=' . $appkey;
     
     // 4. MD5����+ת����д���õ�����ǩ��
     $sign = strtoupper(md5($str));
     return $sign;
 }
 
 function doHttpPost($url, $params)
 {
     $curl = curl_init();
     
     $response = false;
     do
     {
         // 1. ����HTTP URL (API��ַ)
         curl_setopt($curl, CURLOPT_URL, $url);
         
         // 2. ����HTTP HEADER (��POST)
         $head = array(
         'Content-Type: application/x-www-form-urlencoded'
             );
         curl_setopt($curl, CURLOPT_HTTPHEADER, $head);
         
         // 3. ����HTTP BODY (URL��ֵ��)
         $body = http_build_query($params);
         curl_setopt($curl, CURLOPT_POST, true);
         curl_setopt($curl, CURLOPT_POSTFIELDS, $body);
         
         // 4. ����API����ȡ��Ӧ���
         curl_setopt($curl, CURLOPT_HEADER, false);
         curl_setopt($curl, CURLOPT_NOBODY, false);
         curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
         curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, true);
         curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
         $response = curl_exec($curl);
         if ($response === false)
         {
             $response = false;
             break;
         }
         
         $code = curl_getinfo($curl, CURLINFO_HTTP_CODE);
         if ($code != 200)
         {
             $response = false;
             break;
         }
     } while (0);
     
     curl_close($curl);
     return $response;
 }
 
 
 // Ӧ����Կ
 $appkey = 'LHGNH0usjUTRRRSA';
 
 $params = array(
     'app_id'     => '2107823355',
     'time_stamp' => strval(time()),
     'nonce_str'  => strval(rand()),
     'text'       => '��ѶAI����ƽ̨',
     'sign'       => '',
 );
 
 // ����sign�������ӿ�����ǩ����
 $params['sign'] = getReqSign($params, $appkey);
 
 $url = 'https://api.ai.qq.com/fcgi-bin/nlp/nlp_wordseg';
 $response = doHttpPost($url, $params);
 echo $response;
 
 ?>
 </body>
</html>