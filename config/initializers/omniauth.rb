 Rails.application.config.middleware.use OmniAuth::Builder do
   provider :twitter, '0PhKut5RQCUg', 'ZQcvyAHGiOOSZVSyy8XpPnDYs'
   provider :facebook, '205856720', 'b98bbe99c2f94db5db4a5' , {:scope =>'read_stream,publish_stream,offline_access,user_photos'}
 end
