class EventObserver < ActiveRecord::Observer
  
  include ActionView::Helpers::TextHelper
  include Rails.application.routes.url_helpers
  
  observe :event

  def after_create(event)
    TweetsWorker.send_event_tweets(event.id)
  end

end